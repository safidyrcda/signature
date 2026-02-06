'use client';

import type React from 'react';
import { useState, useRef } from 'react';
import { Download, Eye, Mail, Phone } from 'lucide-react';

export default function SignaturePage() {
  const previewRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    prenom: 'Forename',
    nom: 'NAME',
    poste: 'Job title',
    mobile: '(+261) 38 09 400 00',
    email: 'name_acronym@mnparks.mg',
  });

  const [downloadFormat, setDownloadFormat] = useState<
    'svg' | 'html' | 'jpeg' | 'copy'
  >('copy');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const copyRenderedSignature = async () => {
    if (!previewRef.current) return;

    const html = previewRef.current.innerHTML;
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': new Blob([html], { type: 'text/html' }),
        }),
      ]);
      alert('Signature copiée ✔️ Collez-la dans votre email.');
    } catch {
      alert("La copie n'est pas supportée par ce navigateur.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    copyRenderedSignature();
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
        <form
          onSubmit={handleSubmit}
          className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8"
        >
          {/* FORM SECTION */}
          <div className="space-y-4 bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              Générateur de Signature
            </h2>

            <div className="space-y-3">
              {[
                { name: 'prenom', label: 'Prénom' },
                { name: 'nom', label: 'Nom' },
                { name: 'poste', label: 'Poste' },
                { name: 'mobile', label: 'Mobile' },
                { name: 'email', label: 'Email' },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    {field.label}
                  </label>
                  <input
                    name={field.name}
                    value={(formData as any)[field.name]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 p-4 rounded-lg text-white font-bold text-lg hover:shadow-lg transition transform hover:scale-105"
            >
              Copier la Signature
            </button>
          </div>
        </form>

        <div className="flex justify-left items-start mt-4">
          <div ref={previewRef} className="bg-white shadow-2xl">
            <table
              width="850"
              cellPadding="0"
              cellSpacing="0"
              style={{
                fontFamily: 'Segoe UI, Arial, sans-serif',
                background: '#red',
                color: '#1a1a1a',
              }}
            >
              <tbody>
                <tr>
                  <td
                    width="100"
                    valign="bottom"
                    height={100}
                    align="left"
                    style={{
                      padding: '0 0',
                      borderRadius: '4px 0 0 0',
                      width: '180px',
                      height: '100px',
                    }}
                  >
                    <img
                      src="https://signature.parcs-madagascar.com/left.jpeg"
                      width="180"
                      height="auto"
                      style={{ display: 'block', borderRadius: '0' }}
                      alt="Madagascar National Parks"
                    />
                  </td>
                  <td width="390" valign="bottom" align="left">
                    <div
                      style={{
                        fontSize: '11pt',
                        fontWeight: '700',
                        color: '#1a1a1a',
                        marginBottom: '0px',
                      }}
                    >
                      {formData.prenom} {formData.nom}
                    </div>

                    <div
                      style={{
                        fontSize: '11pt',
                        fontWeight: '600',
                        color: '#d4a574',
                        marginBottom: '12pt',
                      }}
                    >
                      {formData.poste}
                    </div>

                    <div
                      style={{
                        fontSize: '11pt',
                        color: '#4a5568',
                      }}
                    >
                      <div style={{ marginBottom: '0pt' }}>
                        <a
                          href={`tel:${formData.mobile}`}
                          style={{ color: '#1a1a1a', textDecoration: 'none' }}
                        >
                          {formData.mobile}
                        </a>
                      </div>
                      <div style={{ marginBottom: '0' }}>
                        <a
                          href={`mailto:${formData.email}`}
                          style={{ color: '#1a1a1a', textDecoration: 'none' }}
                        >
                          {formData.email}
                        </a>
                      </div>
                      <div
                        style={{
                          marginBottom: '8px',
                          fontSize: '8pt',
                          color: '#4a5568',
                        }}
                      >
                        Lot AI 10 C Ambatobe Antananarivo 103 - MADAGASCAR
                      </div>
                      <div
                        style={{
                          marginTop: '8px',
                          fontSize: '8pt',
                          color: '#718096',
                          marginBottom: '10px',
                        }}
                      >
                        <a
                          href={`mailto:contact@mnparks.mg`}
                          style={{
                            color: '#718096',
                            textDecoration: 'none',
                          }}
                        >
                          contact@mnparks.mg
                        </a>{' '}
                        - www.parcs-madagascar.com
                      </div>
                    </div>
                  </td>

                  <td
                    width="210"
                    valign="middle"
                    align="left"
                    style={{
                      padding: '0 0',
                    }}
                  >
                    <img
                      src="https://signature.parcs-madagascar.com/right.jpeg"
                      width="211"
                      height="auto"
                      style={{ display: 'block' }}
                      alt="Madagascar National Parks"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              cellPadding="0"
              cellSpacing="0"
              width="850"
              style={{
                fontFamily: 'Segoe UI, Arial, sans-serif',
                background: '#ffffff',
                color: '#1a1a1a',
              }}
            >
              <tbody>
                <tr>
                  <td
                    width="650"
                    valign="top"
                    align="left"
                    style={{
                      padding: '0px 0px 0px 0px',
                    }}
                  >
                    <img
                      src="https://signature.parcs-madagascar.com/footer.jpeg"
                      width="650"
                      height="auto"
                      style={{
                        display: 'block',
                      }}
                      alt="Madagascar National Parks"
                    />
                  </td>
                  <td
                    width="200"
                    style={{
                      padding: '0px',
                      textAlign: 'left',
                    }}
                  >
                    <table
                      align="center"
                      cellPadding="0"
                      cellSpacing="0"
                      border={0}
                    >
                      <tbody>
                        <tr>
                          <td align="center" style={{ padding: '0 0px' }}>
                            <a
                              href="https://facebook.com"
                              style={{
                                display: 'inline-block',
                                textDecoration: 'none',
                              }}
                            >
                              <img
                                src="https://signature.parcs-madagascar.com/fb.jpeg"
                                width="30"
                                height="30"
                                alt="Facebook"
                              />
                            </a>
                          </td>

                          <td align="center" style={{ padding: '0 6px' }}>
                            <a
                              href="https://youtube.com"
                              style={{
                                display: 'inline-block',
                                textDecoration: 'none',
                              }}
                            >
                              <img
                                src="https://signature.parcs-madagascar.com/yt.jpeg"
                                width="30"
                                height="30"
                                alt="YouTube"
                              />
                            </a>
                          </td>

                          <td align="center" style={{ padding: '0 6px' }}>
                            <a
                              href="https://linkedin.com"
                              style={{
                                display: 'inline-block',
                                textDecoration: 'none',
                              }}
                            >
                              <img
                                src="https://signature.parcs-madagascar.com/in.jpeg"
                                width="30"
                                height="30"
                                alt="LinkedIn"
                              />
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
