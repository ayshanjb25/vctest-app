import json
import pandas as pd
from bs4 import BeautifulSoup

documentTitleList = []
documentTextList = []
questionTextList = []
yesNoAnswerList = []
shortAnswersList= []

with open('dev.jsonl', 'r', encoding='utf-8') as file:
    for line_number, line in enumerate(file, start=1):
        try:
            item = json.loads(line)

            documentTitle = item.get('document_title', '')
            documentText = item.get('document_text', '')
            questionText = item.get('question_text', '')
            annotations = item.get('annotations', [])

            yesNoAnswer = annotations[0].get('yes_no_answer', 'NONE') if annotations else 'NONE'

            shortAnswers = annotations[0].get('short_answers', [])
            shortAnswerValues = [f"{sa['start_token']}-{sa['end_token']}" for sa in shortAnswers]

            soup = BeautifulSoup(documentText, 'html.parser')
            h1_tag = soup.find('h1')
            extractedDocumentText = h1_tag.text if h1_tag else ''

            documentTitleList.append(documentTitle)
            questionTextList.append(questionText)
            yesNoAnswerList.append(yesNoAnswer)
            shortAnswersList.append(shortAnswerValues)
            documentTextList.append(extractedDocumentText)
            
        except json.JSONDecodeError as err:
            print(f"Error occurred while decoding JSON on line {line_number}: {err}")
            print(f"Problematic line: {line}")

df = pd.DataFrame({
    'document_title': documentTitleList,
    'document_text': documentTextList,
    'question_text': questionTextList,
    'yes_no_answer': yesNoAnswerList
})

shortAnswersDF = pd.DataFrame(shortAnswersList)
shortAnswersColumns = [f"short_answer{i+1}" for i in range(shortAnswersDF.shape[1])]
shortAnswersDF.columns = shortAnswersColumns

df = pd.concat([df, shortAnswersDF], axis=1)

df.to_csv('newDataset.csv', index=False)
