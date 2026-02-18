'use client';

import type React from 'react';
import { useState, useRef } from 'react';
import { Download, Eye, Mail, Phone } from 'lucide-react';

export default function SignaturePage() {
  const previewRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    prenom: 'Prénom',
    nom: 'Nom',
    poste: 'Poste',
    mobile: '(+261) 38 09 400 00',
    email: 'email@mnparks.mg',
  });

  const [downloadFormat, setDownloadFormat] = useState<
    'svg' | 'html' | 'jpeg' | 'copy'
  >('copy');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const copyRenderedSignature = async () => {
    if (!previewRef.current) return;

    const p = "<p  style=' font-size:8pt;color:#718096; margin:0;> test</p>";

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
          <div ref={previewRef} className="bg-red shadow-2xl">
            <table width="850" cellPadding="0" cellSpacing="0">
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
                      position: 'relative',
                    }}
                  >
                    <img
                      src="https://signature.parcs-madagascar.com/left.png"
                      width="100"
                      height="auto"
                      style={{
                        display: 'block',
                        borderRadius: '0',
                        left: 0,
                      }}
                      alt="Madagascar National Parks"
                    />
                  </td>
                  <td
                    width="390"
                    valign="bottom"
                    align="left"
                    style={{ padding: '0 12px', marginBottom: '0px' }}
                  >
                    <div
                      style={{
                        fontSize: '11pt',
                        fontWeight: '500',
                        color: '#10103c',
                        marginBottom: '0px',
                      }}
                    >
                      {formData.prenom}
                    </div>
                    <div
                      style={{
                        fontSize: '11pt',
                        fontWeight: '700',
                        color: '#10103c',
                        marginBottom: '0px',
                      }}
                    >
                      {formData.nom}
                    </div>

                    <div
                      style={{
                        fontSize: '11pt',
                        fontWeight: '600',
                        color: '#d4a574',
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
                          fontSize: '8pt',
                          color: '#4a5568',
                        }}
                      >
                        Lot AI 10 C Ambatobe Antananarivo 103 - MADAGASCAR
                      </div>
                      <p
                        style={{
                          fontSize: '8pt',
                          color: '#718096',
                          margin: 0,
                          marginBottom: '3pt',
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
                        <a
                          href={`https://parcs-madagascar.com/`}
                          style={{
                            color: '#718096',
                            textDecoration: 'none',
                          }}
                        >
                          - www.parcs-madagascar.com
                        </a>
                      </p>
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
                      src="https://signature.parcs-madagascar.com/right.png"
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
                      width: '650',
                      height: 'auto',
                    }}
                  >
                    <img
                      src="https://signature.parcs-madagascar.com/footer.png"
                      width="650"
                      height="auto"
                      style={{
                        display: 'block',
                        width: '650',
                        maxWidth: '100%',
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
                          <td align="center" style={{ padding: '0 6px' }}>
                            <a
                              href="https://www.facebook.com/madagascarnationalparks/"
                              style={{
                                display: 'inline-block',
                                textDecoration: 'none',
                              }}
                            >
                              <img
                                src="https://signature.parcs-madagascar.com/fb.png"
                                width="30"
                                height="30"
                                alt="Facebook"
                              />
                            </a>
                          </td>

                          <td align="center" style={{ padding: '0 6px' }}>
                            <a
                              href="https://www.youtube.com/channel/UC6AmIfYIQoPKF94TsSxHQFQ"
                              style={{
                                display: 'inline-block',
                                textDecoration: 'none',
                              }}
                            >
                              <img
                                src="https://signature.parcs-madagascar.com/yt.png"
                                width="30"
                                height="30"
                                alt="YouTube"
                              />
                            </a>
                          </td>

                          <td align="center" style={{ padding: '0 6px' }}>
                            <a
                              href="https://www.linkedin.com/company/mada-national-parks/"
                              style={{
                                display: 'inline-block',
                                textDecoration: 'none',
                              }}
                            >
                              <img
                                src="https://signature.parcs-madagascar.com/in.png"
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
