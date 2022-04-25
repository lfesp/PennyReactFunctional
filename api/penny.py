#!/usr/bin/env python

#-----------------------------------------------------------------------
# penny.py
# Author: Bob Dondero
#-----------------------------------------------------------------------

from flask import Flask, request, make_response, render_template
from database import search

#-----------------------------------------------------------------------

app = Flask(__name__, template_folder='.', static_folder='../build',
    static_url_path='/')

#-----------------------------------------------------------------------

@app.route('/')
def index():
    return app.send_static_file('index.html')

#-----------------------------------------------------------------------

@app.route('/searchresults', methods=['GET'])
def search_results():

    author = request.args.get('author')
    if (author is None) or (author.strip() == ''):
        response = make_response('')
        return response

    books = search(author)  # Exception handling omitted

    html = ''
    pattern = '<strong>%s</strong>: %s ($%.2f)<br>'
    for book in books:
        html += pattern % book.to_tuple()

    response = make_response(html)
    return response
