module.exports = {
  "cmds": {
    "win32": {
      "nvidia": "pip install torch==2.3.1 torchvision==0.18.1 torchaudio==2.3.1 xformers --index-url https://download.pytorch.org/whl/cu121",
      "amd": "pip install torch-directml torchvision torchaudio",
      "cpu": "pip install torch==2.3.1 torchvision==0.18.1 torchaudio==2.3.1"
    },
    "darwin": "pip install torch==2.3.1 torchvision==0.18.1 torchaudio==2.3.1",
    "linux": {
      "nvidia": "pip install torch==2.3.1 torchvision==0.18.1 torchaudio==2.3.1 xformers --index-url https://download.pytorch.org/whl/cu121",
      "amd": "pip install torch==2.3.1 torchvision==0.18.1 torchaudio==2.3.1 --index-url https://download.pytorch.org/whl/rocm5.7",
      "cpu": "pip install torch==2.3.1 torchvision==0.18.1 torchaudio==2.3.1 --index-url https://download.pytorch.org/whl/cpu"
    }
  },
  "requires": [{
    "type": "conda",
    "name": "ffmpeg",
    "args": "-c conda-forge"
  }],
  "run": [{
    "method": "shell.run",
    "params": {
      "message": "git clone https://huggingface.co/spaces/cocktailpeanut/LGM app"
    }
  }, {
    "method": "shell.run",
    "params": {
      "conda": "env",
      "path": "app",
      "message": [
        "{{platform === 'win32' ? 'where pip' : 'which pip'}}",
        "{{(platform === 'darwin' ? self.cmds.darwin : (['nvidia', 'amd'].includes(gpu) ? self.cmds[platform][gpu] : self.cmds[platform].cpu))}}",
        "{{platform === 'win32' ? 'where pip' : 'which pip'}}",
        "pip install opencv-python",
        "{{platform === 'win32' ? 'where pip' : 'which pip'}}",
        "pip install -r requirements.txt",
        "{{platform === 'win32' ? 'where pip' : 'which pip'}}",
        "conda install -y cudnn libzlib-wapi -c conda-forge",
        "conda install -y cuda -c nvidia/label/cuda-12.1.0"
      ]
    }
//  }, {
//    "method": "fs.share",
//    "params": {
//      "venv": "app/env"
//    }
  }, {
    "method": "notify",
    "params": {
      "html": "Click the 'start' tab to get started!"
    }
  }]
}
