"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Download, Eye, Mail, Phone, User } from "lucide-react"
import Image from "next/image"

export default function SignaturePage() {
  const previewRef = useRef<HTMLAnchorElement>(null)

  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    poste: "",
    mobile: "",
    email: "",
  })

  const [downloadFormat, setDownloadFormat] =
    useState<"svg" | "html" | "jpeg" | "copy">("svg")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  /* =======================
     COPIE RENDU HTML
     ======================= */
  const copyRenderedSignature = async () => {
    if (!previewRef.current) return

    const html = previewRef.current.outerHTML
    const text = previewRef.current.innerText

    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
          "text/plain": new Blob([text], { type: "text/plain" }),
        }),
      ])
      alert("Signature copiée ✔️ Collez-la dans votre email.")
    } catch {
      alert("La copie n’est pas supportée par ce navigateur.")
    }
  }

 

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    copyRenderedSignature()
    
  }

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {/* FORM */}
        <div className="space-y-4">
          {["prenom", "nom", "poste", "mobile", "email"].map((f) => (
            <input
              key={f}
              name={f}
              placeholder={f}
              value={(formData as any)[f]}
              onChange={handleChange}
              className="w-full p-3 rounded bg-white/10 text-white"
              required
            />
          ))}

          <div className="grid grid-cols-4 gap-2">
            {["svg", "html", "copy", "jpeg"].map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setDownloadFormat(f as any)}
                className={`p-3 rounded border ${
                  downloadFormat === f ? "border-amber-500" : "border-white/20"
                }`}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>

          <button className="w-full bg-amber-600 p-4 rounded text-white font-bold">
            {downloadFormat === "copy" ? "Copier la signature" : "Valider"}
          </button>
        </div>

        <div className="flex justify-center">
          <div
            href="https://www.mnparks.mg"
            target="_blank"
            rel="noreferrer"
            ref={previewRef}
            style={{
              width: 700,
              height: 250,
              background: "#fff",
              fontFamily: "Segoe UI, Arial",
              textDecoration: "none",
              color: "#1a1a1a",
              padding: 50,
              display: "block",
              position: "relative",
             
            }}
          >
            <div style={{ fontSize: 11, marginTop: 20, position: "absolute", top: 0, right: 20   }}>
              <div>
                <a href={`tel:${formData.mobile}`} style={{ color: "#1a1a1a" }}>
                  Mobile : {formData.mobile || "+261 XX XX XX"}
                </a>
              </div>
              <div>
                <a href={`https://facebook.com`} style={{ color: "#1a1a1a" }}>
                
                  E-mail : {formData.email || "email@example.com"}
                </a>
              </div>
              </div>
            <img src={'http://localhost:3000/test.jpeg'} alt="Logo MNP" width={600} height={330} style={{ marginBottom: 10 }} />
            <div style={{ fontSize: 18, fontWeight: 700 }}>
              {formData.prenom || "Prénom"} {formData.nom || "Nom"}
            </div>

            <div style={{ fontSize: 13, fontWeight: 700, color: "#d4a574" }}>
              {formData.poste || "Poste"}
            </div>

            
            </div>
          </div>
        
      </form>
    </div>
  )
}
