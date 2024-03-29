const mongoose = require('mongoose');
const fs = require('fs').promises; // File system module for file operations
const path = require('path');

const { Schema } = mongoose;

module.exports = class MongoDB {
  constructor(url, folderPath, options = { useNewUrlParser: true, useUnifiedTopology: true }) {
    this.url = url;
    this.folderPath = folderPath;
    this.data = this._data = this._schema = this._model = {};
    this.db;
    this.options = options;
  }

  async read() {
    this.db = await mongoose.connect(this.url, { ...this.options });
    this.connection = mongoose.connection;
    
    let schema = this._schema = new Schema({
      filename: {
        type: String,
        required: true,
      },
      content: {
        type: Object,
        required: true,
        default: {}
      }
    });

    try { 
      this._model = mongoose.model('jsonData', schema);
    } catch {
      this._model = mongoose.model('jsonData');
    }

    const fileNames = await fs.readdir(this.folderPath);
    for (const fileName of fileNames) {
      const filePath = path.join(this.folderPath, fileName);
      const content = await fs.readFile(filePath, 'utf8');
      await this._model.findOneAndUpdate({ filename: fileName }, { content: JSON.parse(content) }, { upsert: true });
    }

    this._data = await this._model.find({});
    this.data = this._data.reduce((acc, curr) => {
      acc[curr.filename] = curr.content;
      return acc;
    }, {});

    return this.data;
  }

  async write(fileName, data) {
    if (!fileName || !data) return;

    const filePath = path.join(this.folderPath, fileName);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));

    await this._model.findOneAndUpdate(
      { filename: fileName },
      { content: data },
      { upsert: true }
    );
  }
};
