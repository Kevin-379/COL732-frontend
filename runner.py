from flask import Flask, render_template
app = Flask(__name__, template_folder='.')
@app.route('/')
def index():
   print('from Index()')
   return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
