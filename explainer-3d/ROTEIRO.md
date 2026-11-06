# Roteiro + plano de cenas

**Tema:** A geladeira não fabrica frio  
**Formato:** vertical 1080×1920 · 30 fps · ~72 s  
**Estilo:** Desmontando o Mundo (cutaway + mito corrigido + 1 frase = 1 cena)

---

## Gancho (tipo)

**Mito corrigido:** “A geladeira fabrica frio?” → “Não. Ela remove calor.”

---

## Roteiro falado

| # | Tempo | Texto | Visual |
|---|-------|-------|--------|
| 1 | 0–3 s | A geladeira fabrica frio? | Geladeira fechada, luz fria, pergunta na tela |
| 2 | 3–6 s | Essa explicação parece certa… mas não é. | Zoom leve + tremor do mito |
| 3 | 6–10 s | Ela não cria frio. Ela remove calor de dentro. | Cutaway: parede some, interior aparece |
| 4 | 10–15 s | Um gás especial circula pelos tubos e absorve o calor dos alimentos. | Partículas quentes (laranja) sendo sugadas pelos tubos |
| 5 | 15–20 s | Depois, esse calor é jogado para fora — nas serpentinas da traseira. | Câmera gira para as serpentinas; calor sai |
| 6 | 20–26 s | Compressor, evaporador, condensador: um ciclo contínuo de troca de calor. | Diagrama do ciclo com setas |
| 7 | 26–32 s | Por isso a parte de trás esquenta. A geladeira move calor — não inventa frio. | Insight final + geladeira completa |
| 8 | 32–36 s | Desmontando o estilo: como as coisas funcionam por dentro. | Fecho / identidade |

*(No projeto Remotion os beats vão até ~72 s para respirar visualmente; o texto acima é a versão condensada para narração.)*

---

## Regras do estilo (checklist)

1. Abrir com pergunta ou mito — nunca com “hoje vamos falar de…”
2. Cada frase precisa ser **visível** (se não dá para mostrar, reescreva)
3. Sem rosto / sem câmera do criador
4. Cutaway ou fluxo causa→efeito
5. Fecho = insight, não CTA genérico

---

## Como plugar narração real

1. Grave o texto com ElevenLabs ou Gemini TTS
2. Exporte `public/narracao.wav`
3. Em `src/Composition.tsx`, descomente o `<Audio />`
4. Ajuste `startFrame` / `endFrame` em `src/lib/script.ts` com o mapa palavra-a-palavra

---

## Próximos temas no mesmo molde

- O ar-condicionado não fabrica frio
- Por que o micro-ondas não aquece o prato
- Como uma ponte sustenta tanto peso
- Como um prédio fica de pé
