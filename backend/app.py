from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load CSV data into a DataFrame
df = pd.read_csv('data/LG_preverbs.csv')
df = df[df['language'] == 'Latin']
# in whg_url, fill in the missing values with an empty string
df['whg_url'] = df['whg_url'].fillna('')

@app.route('/')
def home():
    return "Welcome to the Preverbs API! Visit /api/preverbs to get a list of preverbs."

@app.route('/api/preverbs', methods=['GET'])
def get_preverbs():
    preverbs = sorted(df['preverb'].unique().tolist())  # Get unique preverbs and sort them
    return jsonify(preverbs)  # Return the sorted list as JSON

@app.route('/api/preverbs/<preverb>', methods=['GET'])
def get_preverb_statistics(preverb):
    filtered_df = df[df['preverb'] == preverb]

    # Get verbal bases statistics
    # verbal_bases = filtered_df['verbal_base'].value_counts().to_dict()
    lemmas = filtered_df['lemma'].value_counts().to_dict()
    # sort by counts (decreasing)
    lemmas = dict(sorted(lemmas.items(), key=lambda item: item[1], reverse=True))

    # Get meanings statistics
    meanings = filtered_df['verb_semantics'].value_counts().to_dict()
    # sort by counts (decreasing)
    meanings = dict(sorted(meanings.items(), key=lambda item: item[1], reverse=True))

    # Get total occurrences
    total_occurrences = len(filtered_df)

    # Get all examples
    # Get examples with counts
    examples = (filtered_df.groupby(['lemma', 'meaning_id', 'verb_semantics'])
               .size()
               .reset_index()
               .rename(columns={0: 'count'})
               .sort_values('count', ascending=False)
               .to_dict('records'))

    return jsonify({
        'verbal_bases': lemmas,
        'meanings': meanings,
        'total_occurrences': total_occurrences,
        'examples': examples
    })

@app.route('/api/meanings/<meaning_id>', methods=['GET'])
def get_meaning_occurrences(meaning_id):
    print("df len:", len(df))
    # Filter by the requested meaning
    filtered_df = df[df['meaning_id'] == meaning_id]
    print(meaning_id)
    print("Filtered df", len(filtered_df))
    # Build a JSON-serializable list of occurrences
    occurrences = []

    for _, row in filtered_df.iterrows():
        print("x")
        occurrences.append({
            'preverb': row['preverb'],
            'lemma': row['lemma'],
            'sentence': row['sentence'],
            'token': row['verb_token'],
            'location_url': row['whg_url'],
            'author': row['author'],
            'title': row['title'],
            'century': row['century']
        })

    # add verb semantics to the response
    verb_semantics = filtered_df['verb_semantics'].iloc[0]
    return jsonify({
        'occurrences': occurrences,
        'verb_semantics': verb_semantics
    })

@app.route('/api/dataset', methods=['GET'])
def get_full_dataset():
    # Return the full dataset with pagination
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 50, type=int)

    start_idx = (page - 1) * per_page
    end_idx = start_idx + per_page

    total_records = len(df)
    records = df.iloc[start_idx:end_idx].to_dict('records')

    return jsonify({
        'data': records,
        'total': total_records,
        'page': page,
        'per_page': per_page
    })

if __name__ == '__main__':
    app.run(debug=True)