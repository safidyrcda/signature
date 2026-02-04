"use client"

import type React from "react"
import { useState } from "react"
import { Download, Eye, Mail, Phone, User } from "lucide-react"

export default function SignaturePage() {
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    poste: "",
    mobile: "",
    email: "",
  })

  const [downloadFormat, setDownloadFormat] = useState<"svg" | "html" | "jpeg">("svg")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const generateSVGSignature = () => {
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="700" height="250" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .title { font-family: 'Segoe UI', Arial, sans-serif; font-weight: bold; font-size: 18px; fill: #1a1a1a; }
      .poste { font-family: 'Segoe UI', Arial, sans-serif; font-weight: bold; font-size: 13px; fill: #d4a574; }
      .text { font-family: 'Segoe UI', Arial, sans-serif; font-size: 11px; fill: #1a1a1a; }
    </style>
  </defs>
  <!-- Border 1 (bottom-right, teal) -->
  <rect x="10" y="10" width="680" height="230" fill="white" stroke="#00627a" strokeWidth="6" fillOpacity="0"/>
  <!-- Border 2 (middle, gold offset 3.5px) -->
  <rect x="6.5" y="6.5" width="680" height="230" fill="none" stroke="#d4a574" strokeWidth="6"/>
  <!-- Border 3 (top-left, teal offset 3.5px more) -->
  <rect x="3" y="3" width="680" height="230" fill="none" stroke="#00627a" strokeWidth="6"/>
  
  <!-- Content -->
  <text x="65" y="75" class="title">${formData.prenom} ${formData.nom}</text>
  <text x="65" y="100" class="poste">${formData.poste}</text>
  <text x="65" y="130" class="text"><tspan fontWeight="bold">Mobile :</tspan> ${formData.mobile}</text>
  <text x="65" y="150" class="text"><tspan fontWeight="bold">E-mail :</tspan> ${formData.email}</text>
</svg>`

    const blob = new Blob([svg], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `signature_${formData.nom || "email"}.svg`
    link.click()
    URL.revokeObjectURL(url)
  }

  const generateHTMLSignature = () => {
    const html = `<div style="font-family:'Segoe UI',Arial,sans-serif;width:700px;height:250px;background:#fff;position:relative;margin:0;padding:0">
  <div style="position:absolute;top:3px;left:3px;width:694px;height:244px;border:6px solid #00627a;box-sizing:border-box;pointer-events:none"></div>
  <div style="position:absolute;top:6.5px;left:6.5px;width:687px;height:237px;border:6px solid #d4a574;box-sizing:border-box;pointer-events:none"></div>
  <div style="position:absolute;top:10px;left:10px;width:680px;height:230px;border:6px solid #00627a;box-sizing:border-box;pointer-events:none"></div>
  <div style="position:absolute;top:50px;left:50px;right:30px">
    <div style="font-size:18px;font-weight:700;color:#1a1a1a;line-height:1.2;margin-bottom:4px">${formData.prenom} ${formData.nom}</div>
    <div style="font-size:13px;color:#d4a574;font-weight:700;margin-bottom:12px;line-height:1.3">${formData.poste}</div>
    <div style="font-size:11px;color:#1a1a1a;line-height:1.8">
      <div><span style="font-weight:600">Mobile :</span> ${formData.mobile}</div>
      <div><span style="font-weight:600">E-mail :</span> ${formData.email}</div>
    </div>
  </div>
</div>`

    navigator.clipboard.writeText(html).then(() => {
      alert("Signature HTML copiée dans le presse-papiers! Collez-la dans votre client email.")
    })
  }

  const generateCompressedJPEG = () => {
    const canvas = document.createElement("canvas")
    canvas.width = 700
    canvas.height = 250

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, 700, 250)

    // Bordure 3 (top-left, teal)
    ctx.strokeStyle = "#00627a"
    ctx.lineWidth = 6
    ctx.strokeRect(3, 3, 680, 230)

    // Bordure 2 (middle, gold)
    ctx.strokeStyle = "#d4a574"
    ctx.lineWidth = 6
    ctx.strokeRect(6.5, 6.5, 680, 230)

    // Bordure 1 (bottom-right, teal)
    ctx.strokeStyle = "#00627a"
    ctx.lineWidth = 6
    ctx.strokeRect(10, 10, 680, 230)

    // Textes
    ctx.font = "bold 18px 'Segoe UI', Arial, sans-serif"
    ctx.fillStyle = "#1a1a1a"
    ctx.fillText(`${formData.prenom} ${formData.nom}`, 65, 75)

    ctx.font = "bold 13px 'Segoe UI', Arial, sans-serif"
    ctx.fillStyle = "#d4a574"
    ctx.fillText(formData.poste, 65, 100)

    ctx.font = "600 11px 'Segoe UI', Arial, sans-serif"
    ctx.fillStyle = "#1a1a1a"
    ctx.fillText("Mobile :", 65, 130)
    ctx.font = "11px 'Segoe UI', Arial, sans-serif"
    ctx.fillText(formData.mobile, 140, 130)

    ctx.font = "600 11px 'Segoe UI', Arial, sans-serif"
    ctx.fillText("E-mail :", 65, 150)
    ctx.font = "11px 'Segoe UI', Arial, sans-serif"
    ctx.fillText(formData.email, 140, 150)

    const link = document.createElement("a")
    link.download = `signature_${formData.nom || "email"}.jpg`
    link.href = canvas.toDataURL("image/jpeg", 0.65)
    link.click()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (downloadFormat === "svg") {
      generateSVGSignature()
    } else if (downloadFormat === "html") {
      generateHTMLSignature()
    } else {
      generateCompressedJPEG()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-1 h-8 bg-gradient-to-b from-teal-500 to-amber-500 rounded"></div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Signature Email</h1>
            <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-teal-500 rounded"></div>
          </div>
          <p className="text-slate-400 text-lg">Créez votre signature professionnelle en quelques secondes</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Form Section */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <User className="w-6 h-6 text-amber-500" />
              Informations
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Prénom & Nom */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Prénom</label>
                  <input
                    type="text"
                    name="prenom"
                    placeholder="Ange"
                    value={formData.prenom}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Nom</label>
                  <input
                    type="text"
                    name="nom"
                    placeholder="El'Gareine HERIMALALA"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Poste */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">Poste / Fonction</label>
                <input
                  type="text"
                  name="poste"
                  placeholder="Chargée de Communication"
                  value={formData.poste}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-teal-500" />
                  Téléphone Mobile
                </label>
                <input
                  type="tel"
                  name="mobile"
                  placeholder="+261 38 09 400 48"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-teal-500" />
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="gareine_ccom@mnparks.mg"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-3">Format de sortie</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "svg", label: "SVG", desc: "~2KB" },
                    { id: "html", label: "HTML", desc: "~1KB" },
                    { id: "jpeg", label: "JPEG", desc: "~5KB" },
                  ].map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setDownloadFormat(option.id as any)}
                      className={`p-3 rounded-lg border-2 transition-all text-center ${
                        downloadFormat === option.id
                          ? "border-amber-500 bg-amber-500/20 text-white"
                          : "border-white/20 bg-white/5 text-slate-300 hover:border-white/40"
                      }`}
                    >
                      <div className="font-semibold">{option.label}</div>
                      <div className="text-xs text-slate-400">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-8 bg-gradient-to-r from-teal-600 to-amber-600 hover:from-teal-700 hover:to-amber-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
              >
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                {downloadFormat === "html" ? "Copier la Signature" : `Télécharger en ${downloadFormat.toUpperCase()}`}
              </button>
            </form>
          </div>

          {/* Preview Section */}
          <div className="flex flex-col">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl flex-1 flex flex-col">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Eye className="w-6 h-6 text-amber-500" />
                Aperçu
              </h2>

              <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 border border-white/10">
                <div
                  className="w-full max-w-md bg-white"
                  style={{
                    fontFamily: "'Segoe UI', 'Arial', sans-serif",
                    aspectRatio: "700/250",
                    position: "relative",
                    boxShadow: "0 0 30px rgba(0,0,0,0.3)",
                  }}
                >
                  {/* Border 3 (top-left, teal) */}
                  <div
                    style={{
                      position: "absolute",
                      top: "3px",
                      left: "3px",
                      width: "calc(100% - 6px)",
                      height: "calc(100% - 6px)",
                      border: "6px solid #00627a",
                      boxSizing: "border-box",
                      pointerEvents: "none",
                    }}
                  />
                  {/* Border 2 (middle, gold) */}
                  <div
                    style={{
                      position: "absolute",
                      top: "6.5px",
                      left: "6.5px",
                      width: "calc(100% - 13px)",
                      height: "calc(100% - 13px)",
                      border: "6px solid #d4a574",
                      boxSizing: "border-box",
                      pointerEvents: "none",
                    }}
                  />
                  {/* Border 1 (bottom-right, teal) */}
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      width: "calc(100% - 20px)",
                      height: "calc(100% - 20px)",
                      border: "6px solid #00627a",
                      boxSizing: "border-box",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Content */}
                  <div
                    style={{
                      position: "relative",
                      zIndex: 10,
                      padding: "50px 50px 30px 50px",
                      height: "100%",
                      boxSizing: "border-box",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "18px",
                          fontWeight: "700",
                          color: "#1a1a1a",
                          marginBottom: "4px",
                          lineHeight: "1.2",
                        }}
                      >
                        {formData.prenom || "[Prénom]"} {formData.nom || "[Nom]"}
                      </div>

                      <div
                        style={{
                          fontSize: "13px",
                          color: "#d4a574",
                          fontWeight: "700",
                          marginBottom: "12px",
                          lineHeight: "1.3",
                        }}
                      >
                        {formData.poste || "[Poste/Fonction]"}
                      </div>
                    </div>

                    <div
                      style={{
                        fontSize: "11px",
                        color: "#1a1a1a",
                        lineHeight: "1.8",
                      }}
                    >
                      <div style={{ marginBottom: "4px" }}>
                        <span style={{ fontWeight: "600" }}>Mobile :</span> {formData.mobile || "[+261 XX XX XX XX]"}
                      </div>
                      <div>
                        <span style={{ fontWeight: "600" }}>E-mail :</span> {formData.email || "[email@example.com]"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-slate-400 text-sm">
          <p>Choisissez votre format : SVG (vectoriel), HTML (copie-coller), ou JPEG compressé</p>
        </div>
      </div>
    </div>
  )
}
