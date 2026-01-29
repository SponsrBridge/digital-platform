import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Upload, Sparkles, Image as ImageIcon, Loader2 } from 'lucide-react';

const ImageEditor: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setGeneratedImage(null);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          // Remove Data URL prefix (e.g., "data:image/jpeg;base64,")
          const base64String = reader.result.split(',')[1];
          resolve(base64String);
        }
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleGenerate = async () => {
    if (!selectedFile || !prompt) return;

    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64Data = await fileToBase64(selectedFile);
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: selectedFile.type,
              },
            },
            {
              text: prompt,
            },
          ],
        },
      });

      // Parse response to find image
      const candidates = response.candidates;
      if (candidates && candidates[0]?.content?.parts) {
        for (const part of candidates[0].content.parts) {
          if (part.inlineData && part.inlineData.data) {
            const imageUrl = `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
            setGeneratedImage(imageUrl);
            break;
          }
        }
      }
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Failed to generate image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 bg-[#0B0F15] relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-teal/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            AI Sponsorship <span className="text-brand-teal">Visualizer</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Upload a venue photo and use AI to visualize sponsorship placements, remove distractions, or apply branding styles.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Input Section */}
          <div className="space-y-6">
            <div 
                className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-colors cursor-pointer h-80 ${previewUrl ? 'border-brand-teal/50 bg-brand-card/50' : 'border-gray-700 hover:border-brand-teal/50 bg-brand-card'}`}
                onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleFileSelect}
              />
              
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="h-full w-full object-contain rounded-lg" />
              ) : (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-brand-navy rounded-full flex items-center justify-center mx-auto border border-gray-700">
                    <Upload className="text-brand-teal w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Click to upload venue image</p>
                    <p className="text-sm text-gray-500">JPG, PNG (Max 5MB)</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-brand-card border border-gray-800 rounded-xl p-2 flex items-center gap-2">
                <input 
                    type="text" 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe edits (e.g., 'Add a large banner on the wall')"
                    className="flex-1 bg-transparent border-none text-white px-4 py-3 focus:outline-none placeholder-gray-500"
                />
                <button 
                    onClick={handleGenerate}
                    disabled={!selectedFile || !prompt || isLoading}
                    className={`px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-all ${
                        !selectedFile || !prompt || isLoading 
                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                        : 'bg-brand-teal text-brand-navy hover:bg-white'
                    }`}
                >
                    {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                    <span className="hidden sm:inline">Generate</span>
                </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="bg-brand-card border border-gray-800 rounded-xl h-80 lg:h-[430px] flex items-center justify-center overflow-hidden relative group">
            {isLoading ? (
                <div className="text-center space-y-3">
                    <Loader2 className="w-10 h-10 text-brand-teal animate-spin mx-auto" />
                    <p className="text-brand-teal animate-pulse">Processing visual...</p>
                </div>
            ) : generatedImage ? (
                <div className="relative w-full h-full">
                    <img src={generatedImage} alt="Generated" className="w-full h-full object-contain" />
                    <a 
                        href={generatedImage} 
                        download="sponsrbridge-visual.png"
                        className="absolute bottom-4 right-4 bg-brand-navy/80 hover:bg-brand-navy text-white px-4 py-2 rounded-lg text-sm font-medium border border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        Download
                    </a>
                </div>
            ) : (
                <div className="text-center text-gray-600 space-y-2">
                    <ImageIcon className="w-12 h-12 mx-auto opacity-50" />
                    <p>Generated result will appear here</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageEditor;