"use client";
import { useState, useRef, useEffect } from "react";

interface TextLayer {
  id: number;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
  effect: string;
  isDragging: boolean;
}

const textEffects = [
  { id: "normal", label: "Normal", style: {} },
  { id: "shadow", label: "Shadow", style: { textShadow: "3px 3px 6px rgba(0,0,0,0.9)" } },
  { id: "glow", label: "Glow", style: { textShadow: "0 0 10px #a855f7, 0 0 20px #a855f7" } },
  { id: "outline", label: "Outline", style: { WebkitTextStroke: "1.5px black" } },
  { id: "fire", label: "Fire", style: { textShadow: "0 0 7px #ff4400, 0 0 15px #ff6600" } },
  { id: "ice", label: "Ice", style: { textShadow: "0 0 7px #00cfff, 0 0 15px #0077ff" } },
];

const photoFilters = [
  { id: "none", label: "Normal", filter: "none" },
  { id: "grayscale", label: "B&W", filter: "grayscale(100%)" },
  { id: "sepia", label: "Sepia", filter: "sepia(80%)" },
  { id: "blur", label: "Blur", filter: "blur(2px)" },
  { id: "bright", label: "Bright", filter: "brightness(1.4)" },
  { id: "contrast", label: "Contrast", filter: "contrast(1.6)" },
  { id: "saturate", label: "Vivid", filter: "saturate(2)" },
  { id: "dark", label: "Dark", filter: "brightness(0.6)" },
];

const stickers = ["😭", "💀", "🤡", "😤", "🔥", "💯", "🎓", "📚", "☕", "💻", "🚀", "🤯", "😎", "🥲", "👨‍💻", "🏆"];
const textColors = ["#ffffff", "#ffff00", "#ff4444", "#44ff44", "#4444ff", "#ff44ff", "#44ffff", "#ff8800"];

const navItems = [
  { icon: "🏠", label: "Home", href: "/dashboard" },
  { icon: "🔥", label: "Doubts", href: "/doubts" },
  { icon: "📚", label: "Notes", href: "/notes" },
  { icon: "😂", label: "Memes", href: "/memes" },
  { icon: "🏆", label: "Ranks", href: "/leaderboard" },
];

export default function MemeEditor() {
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [textLayers, setTextLayers] = useState<TextLayer[]>([]);
  const [selectedLayer, setSelectedLayer] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState("none");
  const [selectedStickers, setSelectedStickers] = useState<string[]>([]);
  const [visibility, setVisibility] = useState<"college" | "all">("all");
  const [newText, setNewText] = useState("");
  const [newColor, setNewColor] = useState("#ffffff");
  const [newEffect, setNewEffect] = useState("shadow");
  const [newFontSize, setNewFontSize] = useState(24);
  const [activeTab, setActiveTab] = useState<"text" | "stickers" | "filters" | "visibility">("text");
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setUploadedPhoto(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const addTextLayer = () => {
    if (!newText.trim()) return;
    const newLayer: TextLayer = {
      id: Date.now(),
      text: newText,
      x: 50,
      y: 50,
      fontSize: newFontSize,
      color: newColor,
      effect: newEffect,
      isDragging: false,
    };
    setTextLayers((prev) => [...prev, newLayer]);
    setSelectedLayer(newLayer.id);
    setNewText("");
  };

  const deleteLayer = (id: number) => {
    setTextLayers((prev) => prev.filter((l) => l.id !== id));
    setSelectedLayer(null);
  };

  const updateLayer = (id: number, updates: Partial<TextLayer>) => {
    setTextLayers((prev) => prev.map((l) => l.id === id ? { ...l, ...updates } : l));
  };

  const handleMouseDown = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setSelectedLayer(id);
    setIsDragging(true);
    const layer = textLayers.find((l) => l.id === id);
    if (layer && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left - (layer.x / 100) * rect.width,
        y: e.clientY - rect.top - (layer.y / 100) * rect.height,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || selectedLayer === null || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const newX = ((e.clientX - rect.left - dragOffset.x) / rect.width) * 100;
    const newY = ((e.clientY - rect.top - dragOffset.y) / rect.height) * 100;
    updateLayer(selectedLayer, {
      x: Math.max(0, Math.min(90, newX)),
      y: Math.max(0, Math.min(90, newY)),
    });
  };

  const handleTouchStart = (e: React.TouchEvent, id: number) => {
    e.stopPropagation();
    setSelectedLayer(id);
    setIsDragging(true);
    const layer = textLayers.find((l) => l.id === id);
    if (layer && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      setDragOffset({
        x: touch.clientX - rect.left - (layer.x / 100) * rect.width,
        y: touch.clientY - rect.top - (layer.y / 100) * rect.height,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || selectedLayer === null || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const newX = ((touch.clientX - rect.left - dragOffset.x) / rect.width) * 100;
    const newY = ((touch.clientY - rect.top - dragOffset.y) / rect.height) * 100;
    updateLayer(selectedLayer, {
      x: Math.max(0, Math.min(90, newX)),
      y: Math.max(0, Math.min(90, newY)),
    });
  };

  const getEffectStyle = (effectId: string) => {
    return textEffects.find((e) => e.id === effectId)?.style || {};
  };

  const currentFilter = photoFilters.find((f) => f.id === activeFilter)?.filter || "none";
  const selectedLayerData = textLayers.find((l) => l.id === selectedLayer);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col pb-24">

      {/* Top Bar */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#1f1f1f]">
        <div className="flex items-center gap-3">
          <a href="/memes" className="text-gray-500 hover:text-white transition">←</a>
          <h1 className="text-lg font-bold">Meme Editor 🎨</h1>
        </div>
        <button
          onClick={() => window.location.href = "/memes"}
          className="text-xs bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition font-semibold"
        >
          Post 🚀
        </button>
      </div>

      {/* Canvas Area */}
      <div className="px-5 py-4">
        <div
          ref={canvasRef}
          className="relative w-full rounded-2xl overflow-hidden bg-[#1a1a1a] border-2 border-dashed border-[#2a2a2a] select-none"
          style={{ minHeight: "280px" }}
          onMouseMove={handleMouseMove}
          onMouseUp={() => setIsDragging(false)}
          onTouchMove={handleTouchMove}
          onTouchEnd={() => setIsDragging(false)}
          onClick={() => setSelectedLayer(null)}
        >
          {/* Photo or placeholder */}
          {uploadedPhoto ? (
            <img
              src={uploadedPhoto}
              alt="meme base"
              className="w-full object-cover"
              style={{ filter: currentFilter, maxHeight: "320px" }}
            />
          ) : (
            <div
              className="flex flex-col items-center justify-center cursor-pointer py-16"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="text-5xl mb-3">📸</div>
              <p className="text-gray-400 text-sm">Tap to upload your photo</p>
              <p className="text-gray-600 text-xs mt-1">Or start with emoji style below</p>
            </div>
          )}

          {/* Stickers overlay */}
          {selectedStickers.length > 0 && (
            <div className="absolute top-2 left-2 flex flex-wrap gap-1">
              {selectedStickers.map((s, i) => (
                <span key={i} className="text-2xl">{s}</span>
              ))}
            </div>
          )}

          {/* Text Layers */}
          {textLayers.map((layer) => (
            <div
              key={layer.id}
              className={`absolute cursor-move select-none ${selectedLayer === layer.id ? "ring-2 ring-violet-400 ring-offset-1 rounded" : ""}`}
              style={{
                left: `${layer.x}%`,
                top: `${layer.y}%`,
                fontSize: `${layer.fontSize}px`,
                color: layer.color,
                fontWeight: "bold",
                fontFamily: "Impact, sans-serif",
                textTransform: "uppercase",
                padding: "2px 4px",
                ...getEffectStyle(layer.effect),
              }}
              onMouseDown={(e) => handleMouseDown(e, layer.id)}
              onTouchStart={(e) => handleTouchStart(e, layer.id)}
            >
              {layer.text}
            </div>
          ))}

          {/* Upload button overlay if photo exists */}
          {uploadedPhoto && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-lg"
            >
              📸 Change
            </button>
          )}
        </div>

        <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />

        {/* Warning */}
        <div className="bg-yellow-900/20 border border-yellow-800 rounded-xl p-3 mt-3">
          <p className="text-yellow-300 text-xs">⚠️ Only use <strong>your own photos</strong> or college campus photos. No photos of other students without consent.</p>
        </div>
      </div>

      {/* Selected Layer Controls */}
      {selectedLayerData && (
        <div className="mx-5 mb-4 bg-[#1a1a1a] border border-violet-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-violet-300 text-xs font-semibold">✏️ Editing: "{selectedLayerData.text}"</p>
            <button onClick={() => deleteLayer(selectedLayerData.id)} className="text-red-400 text-xs hover:text-red-300">🗑️ Delete</button>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              value={selectedLayerData.text}
              onChange={(e) => updateLayer(selectedLayerData.id, { text: e.target.value })}
              className="w-full bg-[#111] border border-[#2a2a2a] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500"
            />
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-xs">Size:</span>
              <input type="range" min="12" max="60" value={selectedLayerData.fontSize}
                onChange={(e) => updateLayer(selectedLayerData.id, { fontSize: parseInt(e.target.value) })}
                className="flex-1 accent-violet-500" />
              <span className="text-gray-400 text-xs">{selectedLayerData.fontSize}px</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {textColors.map((c) => (
                <button key={c} onClick={() => updateLayer(selectedLayerData.id, { color: c })}
                  className={`w-7 h-7 rounded-full border-2 transition ${selectedLayerData.color === c ? "border-white scale-110" : "border-transparent"}`}
                  style={{ backgroundColor: c }} />
              ))}
            </div>
            <div className="flex gap-2 flex-wrap">
              {textEffects.map((ef) => (
                <button key={ef.id} onClick={() => updateLayer(selectedLayerData.id, { effect: ef.id })}
                  className={`px-3 py-1 rounded-lg text-xs border transition ${selectedLayerData.effect === ef.id ? "border-violet-500 bg-violet-900/30 text-violet-300" : "border-[#2a2a2a] text-gray-400"}`}>
                  {ef.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tool Tabs */}
      <div className="flex gap-2 px-5 mb-4">
        {[
          { id: "text", label: "✍️ Text" },
          { id: "stickers", label: "🎯 Stickers" },
          { id: "filters", label: "🎨 Filters" },
          { id: "visibility", label: "👁️ Post" },
        ].map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex-1 py-2 rounded-xl text-xs font-medium transition ${activeTab === tab.id ? "bg-violet-600 text-white" : "bg-[#1a1a1a] border border-[#2a2a2a] text-gray-400"}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tool Panels */}
      <div className="px-5 pb-4">

        {/* Text Panel */}
        {activeTab === "text" && (
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 space-y-3">
            <input type="text" value={newText} onChange={(e) => setNewText(e.target.value)}
              placeholder="Type your meme text..."
              className="w-full bg-[#111] border border-[#2a2a2a] text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-violet-500" />

            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-xs">Size:</span>
              <input type="range" min="12" max="60" value={newFontSize}
                onChange={(e) => setNewFontSize(parseInt(e.target.value))}
                className="flex-1 accent-violet-500" />
              <span className="text-gray-400 text-xs">{newFontSize}px</span>
            </div>

            <div>
              <p className="text-gray-400 text-xs mb-2">Color</p>
              <div className="flex gap-2">
                {textColors.map((c) => (
                  <button key={c} onClick={() => setNewColor(c)}
                    className={`w-7 h-7 rounded-full border-2 transition ${newColor === c ? "border-white scale-110" : "border-transparent"}`}
                    style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>

            <div>
              <p className="text-gray-400 text-xs mb-2">Text Effect</p>
              <div className="flex gap-2 flex-wrap">
                {textEffects.map((ef) => (
                  <button key={ef.id} onClick={() => setNewEffect(ef.id)}
                    className={`px-3 py-1 rounded-lg text-xs border transition ${newEffect === ef.id ? "border-violet-500 bg-violet-900/30 text-violet-300" : "border-[#2a2a2a] text-gray-400"}`}>
                    {ef.label}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={addTextLayer}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2 rounded-lg text-sm font-semibold transition">
              + Add Text to Meme
            </button>

            {textLayers.length > 0 && (
              <div>
                <p className="text-gray-500 text-xs mb-2">Text layers (tap to select & drag)</p>
                {textLayers.map((layer) => (
                  <div key={layer.id} onClick={() => setSelectedLayer(layer.id)}
                    className={`flex items-center justify-between p-2 rounded-lg mb-1 cursor-pointer ${selectedLayer === layer.id ? "bg-violet-900/30 border border-violet-700" : "bg-[#111] border border-[#2a2a2a]"}`}>
                    <span className="text-sm" style={{ color: layer.color }}>{layer.text}</span>
                    <button onClick={(e) => { e.stopPropagation(); deleteLayer(layer.id); }} className="text-red-400 text-xs">🗑️</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Stickers Panel */}
        {activeTab === "stickers" && (
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4">
            <p className="text-gray-400 text-xs mb-3">Tap to add/remove stickers</p>
            <div className="grid grid-cols-8 gap-2">
              {stickers.map((s) => (
                <button key={s} onClick={() => {
                  setSelectedStickers((prev) =>
                    prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
                  );
                }}
                  className={`text-2xl p-2 rounded-lg border transition ${selectedStickers.includes(s) ? "border-violet-500 bg-violet-900/30" : "border-[#2a2a2a] bg-[#111]"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Filters Panel */}
        {activeTab === "filters" && (
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4">
            <p className="text-gray-400 text-xs mb-3">Photo filters</p>
            <div className="grid grid-cols-4 gap-2">
              {photoFilters.map((f) => (
                <button key={f.id} onClick={() => setActiveFilter(f.id)}
                  className={`p-3 rounded-xl border text-xs transition flex flex-col items-center gap-1 ${activeFilter === f.id ? "border-violet-500 bg-violet-900/30 text-violet-300" : "border-[#2a2a2a] bg-[#111] text-gray-400"}`}>
                  <span className="text-lg">🖼️</span>
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Visibility + Post Panel */}
        {activeTab === "visibility" && (
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 space-y-4">
            <p className="text-gray-400 text-xs">Who can see this meme?</p>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setVisibility("college")}
                className={`p-4 rounded-xl border text-sm transition ${visibility === "college" ? "border-yellow-500 bg-yellow-900/20 text-yellow-300" : "border-[#2a2a2a] text-gray-400"}`}>
                <div className="text-2xl mb-1">🏫</div>
                <div className="font-medium">My College</div>
                <div className="text-xs opacity-70 mt-1">Only your college students</div>
              </button>
              <button onClick={() => setVisibility("all")}
                className={`p-4 rounded-xl border text-sm transition ${visibility === "all" ? "border-green-500 bg-green-900/20 text-green-300" : "border-[#2a2a2a] text-gray-400"}`}>
                <div className="text-2xl mb-1">🌍</div>
                <div className="font-medium">Everyone</div>
                <div className="text-xs opacity-70 mt-1">All colleges see this</div>
              </button>
            </div>
            <button
              onClick={() => window.location.href = "/memes/my-memes"}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-xl text-sm transition">
              Post Meme & Earn 20 pts 🚀
            </button>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#111] border-t border-[#1f1f1f] flex justify-around py-3 px-4">
        {navItems.map((nav) => (
          <a key={nav.href} href={nav.href}
            className={`flex flex-col items-center gap-1 transition ${nav.label === "Memes" ? "text-violet-400" : "text-gray-600 hover:text-gray-400"}`}>
            <span className="text-xl">{nav.icon}</span>
            <span className="text-[10px]">{nav.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}