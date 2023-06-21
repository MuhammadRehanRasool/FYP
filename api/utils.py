import nltk
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from scipy.stats import chi2_contingency
import numpy as np
import string

nltk.download('punkt')
nltk.download('stopwords')

def keyword_extraction_pipeline(data):
    # Define punctuation removal function
    translator = str.maketrans("", "", string.punctuation)

    # Preprocess data by removing punctuation and stop words
    preprocessed_data = []
    for text in data:
        tokens = nltk.word_tokenize(text.lower())
        tokens = [token.translate(translator) for token in tokens if token not in stopwords.words('english')]
        preprocessed_data.append(" ".join(tokens))

    # Tokenize the preprocessed data
    tokens = [nltk.word_tokenize(text) for text in preprocessed_data]

    # Extract keywords using TF-IDF
    tfidf = TfidfVectorizer(tokenizer=nltk.word_tokenize, stop_words=nltk.corpus.stopwords.words('english'))
    tfs = tfidf.fit_transform(preprocessed_data)
    feature_names = tfidf.get_feature_names_out()

    # Get the most relevant keyword for each document
    relevant_keywords = []
    for i in range(len(preprocessed_data)):
        sorted_indices = tfs[i].toarray()[0].argsort()[::-1]
        for j in sorted_indices:
            keyword = feature_names[j]
            relevant_keywords.append(keyword)
            break

    # Calculate phi coefficient for keyword pairs
    phi_matrix = np.zeros((len(relevant_keywords), len(relevant_keywords)))
    for i in range(len(relevant_keywords)):
        for j in range(i + 1, len(relevant_keywords)):
            a = b = c = d = 0
            for doc_keywords in tokens:
                if relevant_keywords[i] in doc_keywords:
                    if relevant_keywords[j] in doc_keywords:
                        a += 1
                    else:
                        b += 1
                else:
                    if relevant_keywords[j] in doc_keywords:
                        c += 1
                    else:
                        d += 1
            contingency_table = np.array([[a, b], [c, d]])
            _, p, _, _ = chi2_contingency(contingency_table, correction=False)
            phi = np.sqrt(p) * np.sign(a * d - b * c)
            phi_matrix[i][j] = phi
            phi_matrix[j][i] = phi

    # Apply criteria to select the most relevant keyword
    final_keywords = []
    for i, keyword in enumerate(relevant_keywords):
        row = phi_matrix[i]
        relevant_indices = np.where(row > 0)[0]
        if len(relevant_indices) > 0:
            keyword_scores = row[relevant_indices]
            highest_score_index = relevant_indices[np.argmax(keyword_scores)]
            final_keyword = relevant_keywords[highest_score_index]
            final_keywords.append(final_keyword)
        else:
            final_keywords.append(keyword)

    # Further refine the selected keyword based on TF-IDF scores
    final_keywords_refined = []
    for i, keyword in enumerate(final_keywords):
        keyword_index = feature_names.tolist().index(keyword)
        tfidf_scores = tfs[:, keyword_index].toarray().flatten()
        highest_tfidf_index = np.argmax(tfidf_scores)
        final_keyword_refined = feature_names[highest_tfidf_index]
        final_keywords_refined.append(final_keyword_refined)

    return final_keywords_refined

        