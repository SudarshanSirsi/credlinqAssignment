import { Controller, Get, Post, Body, UseInterceptors, UploadedFiles, BadRequestException } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import * as fs from 'fs'

@Controller('applications')
export class ApplicationsController {
    constructor(private readonly applicationsService: ApplicationsService) { }

    @Post('submit')
    @UseInterceptors(
        FilesInterceptor('files', 6, {
            storage: undefined, 
            fileFilter: (req, file, callback) => {
                if (!file.originalname.match(/\.(pdf)$/)) {
                    return callback(new Error('Only PDF files are allowed!'), false);
                }
                callback(null, true);
            },
        }),
    )
    async create(
        @Body() createApplicationDto: CreateApplicationDto,
        @UploadedFiles() files: Express.Multer.File[],
    ) {
        let savedFilePaths: string[] = [];

        try {
            if (!createApplicationDto || !Object.keys(createApplicationDto).length) {
                throw new BadRequestException('Invalid application data');
            }

            const fileNames = files ? files.map(file => file.originalname) : [];
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

            const applicationData = {
                ...createApplicationDto,
                fileNames,
            };

            const application = await this.applicationsService.create(applicationData);

            if (files && files.length > 0) {
                savedFilePaths = await Promise.all(
                    files.map(async (file, index) => {
                        const filename = `doc-${uniqueSuffix}-${file.originalname}`;
                        const filePath = `./uploads/${filename}`;
                        await fs.promises.writeFile(filePath, file.buffer);
                        return filename;
                    }),
                );
            }

            return {
                success: true,
                data: application,
            };
        } catch (error) {
            if (savedFilePaths.length) {
                await Promise.all(
                    savedFilePaths.map(file => fs.promises.unlink(`./uploads/${file}`).catch(err => console.error(`Failed to delete ${file}: ${err}`))),
                );
            }
            throw new BadRequestException(`Failed to create application: ${error.message}`);
        }
    }

    @Get("get")
    async findAll() {
        const applications = await this.applicationsService.findAll();
        return {
            success: true,
            data: applications,
        };
    }
}
