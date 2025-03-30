import React, { useState, useCallback } from 'react';
import { ArrowUpTrayIcon, ArrowDownTrayIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { colorizeImage } from './services/api';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [colorizedImage, setColorizedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageId, setImageId] = useState(null);

  const handleFileChange = useCallback((e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setColorizedImage(null);
        setImageId(null);
      };
      reader.readAsDataURL(selectedFile);
    }
  }, []);

  const handleUpload = async () => {
    if (!file) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await colorizeImage(file);
      setColorizedImage(response.colorized_image);
      setImageId(response.id);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!colorizedImage) return;

    const link = document.createElement('a');
    link.href = `data:image/jpeg;base64,${colorizedImage}`;
    link.download = `colorized_${file.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Image Colorizer
          </h1>
          <p className="text-lg text-gray-600">
            Transform your black and white images into vibrant color photos
          </p>
        </div>

        <div className="card mb-8">
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <PhotoIcon className="h-12 w-12 text-gray-400 mb-4" />
              <span className="text-gray-600">
                {file ? file.name : 'Click to upload an image'}
              </span>
            </label>
          </div>

          {preview && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
              <img
                src={preview}
                alt="Preview"
                className="max-w-full h-auto rounded-lg shadow-md"
              />
            </div>
          )}

          {error && <ErrorMessage message={error} />}

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleUpload}
              disabled={loading || !file}
              className={`btn btn-primary flex items-center ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
                  Colorize Image
                </>
              )}
            </button>
          </div>
        </div>

        {colorizedImage && (
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Result</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Original</h4>
                <img
                  src={preview}
                  alt="Original"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Colorized</h4>
                <img
                  src={`data:image/jpeg;base64,${colorizedImage}`}
                  alt="Colorized"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <button
                onClick={downloadImage}
                className="btn btn-secondary flex items-center"
              >
                <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                Download Colorized Image
              </button>
            </div>
            {imageId && (
              <p className="mt-4 text-center text-sm text-gray-500">
                Image ID: {imageId}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App; 