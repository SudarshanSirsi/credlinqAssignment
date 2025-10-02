import { useState } from "react";

interface UploadDocumentsProps {
  isEnabled: boolean;
  uploadedFiles: File[];
  selectedMonths: { [key: string]: boolean };
  lastSixMonths: string[];
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => void;
  onRemoveAllFiles: () => void;
  onMonthChange: (month: string) => void;
}

const UploadDocuments: React.FC<UploadDocumentsProps> = ({
  isEnabled,
  uploadedFiles,
  selectedMonths,
  lastSixMonths,
  onFileUpload,
  onRemoveFile,
  onRemoveAllFiles,
  onMonthChange
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (!isEnabled) return;

    const files = Array.from(e.dataTransfer.files).filter(
      (f) => f.type === "application/pdf"
    );

    const event = {
      target: { files },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    onFileUpload(event);
  };
  return (
    <div className="flex flex-col md:flex-row items-start mb-4 gap-6">

      <div className="w-full md:w-1/2">
        <div className={`border-2 border-dashed border-gray-300 p-6 text-center rounded-lg mb-4 transition-colors
            ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <div className="text-gray-400 mb-2">
            Click to upload or drag and drop Bank Statements
            {uploadedFiles.length > 0 && (
              <div className="text-sm text-gray-500 mt-1">
                {uploadedFiles.length}/6 files uploaded
              </div>
            )}
          </div>
          <input
            type="file"
            multiple
            accept="application/pdf"
            className="hidden"
            id="bank-statements-upload"
            disabled={!isEnabled || uploadedFiles.length >= 6}
            onChange={onFileUpload}
          />
          <label
            htmlFor="bank-statements-upload"
            className={`cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 inline-block 
               ${(!isEnabled || uploadedFiles.length >= 6) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Choose Files
          </label>
          {uploadedFiles.length >= 6 && (
            <div className="text-sm text-red-500 mt-2">
              Maximum 6 files reached
            </div>
          )}
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="font-semibold text-gray-700 mb-3"></div>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {lastSixMonths.map((month) => (
              <div key={month} className="flex items-center">
                <input
                  type="checkbox"
                  id={`month-${month}`}
                  checked={selectedMonths[month] || false}
                  onChange={() => onMonthChange(month)}
                  className="h-4 w-4 text-blue-600 rounded"
                  disabled={!isEnabled}
                />
                <label htmlFor={`month-${month}`} className="ml-2 text-sm text-gray-700">
                  {month}
                </label>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="text-blue-500 text-sm font-medium hover:text-blue-700"
            disabled={!isEnabled}
          >
            upload statement for remaining months
          </button>
        </div>

        <div className="space-y-2">
          {uploadedFiles.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              No files uploaded yet
            </div>
          ) : (
            <div>
              <div className="flex justify-end mb-3">
                <button
                  type="button"
                  onClick={onRemoveAllFiles}
                  className="text-red-500 hover:text-red-700 text-sm font-medium border border-red-300 px-3 py-1 rounded-md hover:bg-red-50"
                >
                  REMOVE ALL
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="p-3 border border-gray-200 rounded-lg flex items-center justify-between bg-white"
                  >
                    <div className="flex items-center min-w-0 flex-1">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 bg-green-100 text-green-600">
                        ✔
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-sm font-medium block truncate text-gray-700">
                          {file.name}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveFile(index)}
                      className="text-gray-400 hover:text-red-500 ml-2 flex-shrink-0"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="text-gray-600 w-full md:w-1/2 text-sm space-y-3">
        <div className="flex items-start">
          <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
            ✓
          </div>
          <p>PDFs (not scanned copies) of company's operating bank current account(s) statements for the past 6 months.</p>
        </div>
        <div className="ml-7 text-gray-500">
          Example: If today is 02 Nov 23, then please upload bank statements from May 23 to Oct 23 (both months inclusive)
        </div>
        <div className="flex items-start">
          <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
            ✓
          </div>
          <p>If your company is multi-banked, then please upload 6 months bank statements for each bank account</p>
        </div>
        <div className="flex items-start">
          <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
            ✓
          </div>
          <p>If your file is password protected, we request you to remove the password and upload the file to avoid submission failure</p>
        </div>
        <div className="flex items-start">
          <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
            ✓
          </div>
          <p>In case if you are facing any issue while uploading bank statements, Please contact us on <a href="mailto:support@credilinq.ai" className="text-blue-500">support@credilinq.ai</a></p>
        </div>
      </div>
    </div >
  );
};

export default UploadDocuments;
