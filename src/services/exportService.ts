import { getDocs, collection } from 'firebase/firestore'
import { db } from '@/firebase'
import { jsPDF } from 'jspdf'
import JSZip from 'jszip'

export async function exportAnswers() {
  try {
    const answersSnapshot = await getDocs(collection(db, 'answers'))
    const answers: { [p: string]: any; id: string }[] = answersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    if (answers.length === 0) {
      console.warn('No hay respuestas disponibles para exportar.')
      return
    }

    // 🧠 Crear PDF
    const pdf = new jsPDF()
    answers.forEach((answer, index) => {
      const fecha = answer.timestamp?.toDate
        ? answer.timestamp.toDate()
        : new Date(answer.timestamp)

      pdf.setFontSize(12)
      pdf.text(`Formulario ID: ${answer.id}`, 10, 10)
      pdf.text(`Usuario ID: ${answer.userId || 'Desconocido'}`, 10, 20)
      pdf.text(`Fecha: ${fecha.toLocaleString()}`, 10, 30)
      pdf.text('Respuestas:', 10, 40)

      let y = 50
      answer.answers.forEach((ans, i) => {
        const questionText = `${i + 1}. ${ans.question}: ${ans.answer ?? 'Sin respuesta'}`
        if (y > 270) {
          pdf.addPage()
          y = 20
        }
        pdf.text(questionText, 10, y)
        y += 10
      })

      pdf.text(`Posgrado recomendado: ${answer.posgrado || 'N/A'}`, 10, y + 10)

      if (index < answers.length - 1) {
        pdf.addPage()
      }
    })

    // 🧩 Generar archivos
    const pdfBlob = pdf.output('blob')
    const jsonBlob = new Blob([JSON.stringify(answers, null, 2)], { type: 'application/json' })

    // 📦 Crear ZIP
    const zip = new JSZip()
    zip.file('Formularios_Posgrados.pdf', pdfBlob)
    zip.file('Formularios_Posgrados.json', jsonBlob)

    // 📆 Nombre con fecha
    const now = new Date()
    const day = String(now.getDate()).padStart(2, '0')
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const year = now.getFullYear()
    const zipName = `Formularios_Posgrados_${day}_${month}_${year}.zip`

    // 💾 Generar y descargar ZIP
    const content = await zip.generateAsync({ type: 'blob' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(content)
    link.download = zipName
    link.click()

    console.log('ZIP exportado correctamente.')
  } catch (error) {
    console.error('Error al exportar los cuestionarios:', error)
  }
}

export async function exportGraphs() {
  try {
    const canvases = Array.from(document.querySelectorAll('canvas')) as HTMLCanvasElement[]

    if (canvases.length === 0) {
      alert('No se encontraron gráficas para exportar.')
      return
    }

    const pdf = new jsPDF()
    let first = true

    for (const canvas of canvases) {
      const imgData = canvas.toDataURL('image/png')
      if (!first) pdf.addPage()
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 120) // Ajusta tamaño y posición si es necesario
      first = false
    }

    pdf.save('Graficas_Formularios_Posgrados.pdf')
    console.log('Gráficas exportadas correctamente.')
  } catch (error) {
    console.error('Error al exportar gráficas:', error)
  }
}

export async function exportAnswersCSV() {
  try {
    const snapshot = await getDocs(collection(db, 'answers'))
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    if (data.length === 0) {
      console.warn('No hay respuestas para exportar.')
      return
    }

    // Recopilar todas las preguntas únicas
    const questionSet = new Set<string>()
    data.forEach((item) => {
      item.answers.forEach((ans: any) => {
        questionSet.add(ans.question)
      })
    })
    const questionTitles = Array.from(questionSet)

    // Encabezados del CSV
    const headers = ['Formulario ID', 'Usuario ID', 'Fecha', 'Posgrado', ...questionTitles]
    const rows: string[] = [headers.join(',')]

    // Procesar cada respuesta
    data.forEach((item) => {
      const formId = item.id || ''
      const userId = item.userId || 'Desconocido'
      const date = item.timestamp?.toDate
        ? item.timestamp.toDate().toLocaleString()
        : new Date(item.timestamp).toLocaleString()
      const posgrado = item.posgrado || ''

      // Mapa de respuestas por pregunta
      const answerMap: Record<string, string | number> = {}
      item.answers.forEach((ans: any) => {
        answerMap[ans.question] = ans.answer ?? 'Sin respuesta'
      })

      // Respuestas ordenadas según las columnas
      const orderedAnswers = questionTitles.map((q) => `"${answerMap[q] ?? ''}"`)

      const row = [`"${formId}"`, `"${userId}"`, `"${date}"`, `"${posgrado}"`, ...orderedAnswers]
      rows.push(row.join(','))
    })

    // Generar CSV y descargar
    const csvContent = rows.join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', 'Formularios_Posgrados.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    console.log('CSV exportado correctamente.')
  } catch (error) {
    console.error('Error al exportar CSV:', error)
  }
}
