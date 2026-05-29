import pdfplumber
from docx import Document


def extract_text_from_pdf(file):
    text = ""

    with pdfplumber.open(file) as pdf:
        for page in pdf.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted


    return text

def extract_text_from_docx(file):
    
    doc = Document(file)
    text = ""
    for paragraph in doc.paragraphs:
        text += paragraph.text + "\n"

    return text