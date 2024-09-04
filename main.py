from flask import Flask
import os
from natural_sql import create_app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port="12521")