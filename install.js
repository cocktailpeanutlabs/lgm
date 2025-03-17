module.exports = async (kernel) => {
  let cmd = "{{(platform === 'darwin' ? self.cmds.darwin : (['nvidia', 'amd'].includes(gpu) ? self.cmds[platform][gpu] : self.cmds[platform].cpu))}}"
  if (kernel.gpu === 'nvidia' && kernel.gpu_model && / 50.+/.test(kernel.gpu_model)) {
    cmd = "uv pip install --pre torch torchvision torchaudio --index-url https://download.pytorch.org/whl/nightly/cu128"
  }
  if (kernel.platform === 'darwin') {
    if (kernel.arch === "arm64") {
      cmd = "uv pip install torch torchaudio torchvision"
    } else {
      cmd = "uv pip install torch==2.1.2 torchaudio==2.1.2"
    }
  }
  return {
    "cmds": {
      "win32": {
        "nvidia": "uv pip install torch==2.3.1 torchvision==0.18.1 torchaudio==2.3.1 xformers --index-url https://download.pytorch.org/whl/cu121",
        "amd": "uv pip install torch-directml torchvision torchaudio numpy==1.26.4",
        "cpu": "uv pip install torch==2.3.1 torchvision==0.18.1 torchaudio==2.3.1 --index-url https://download.pytorch.org/whl/cpu"
      },
      "darwin": "uv pip install torch==2.3.1 torchvision==0.18.1 torchaudio==2.3.1 --index-url https://download.pytorch.org/whl/cpu",
      "linux": {
        "nvidia": "uv pip install torch==2.3.1 torchvision==0.18.1 torchaudio==2.3.1 xformers --index-url https://download.pytorch.org/whl/cu121",
        "amd": "uv pip install torch==2.3.1 torchvision==0.18.1 torchaudio==2.3.1 --index-url https://download.pytorch.org/whl/rocm5.7",
        "cpu": "uv pip install torch==2.3.1 torchvision==0.18.1 torchaudio==2.3.1 --index-url https://download.pytorch.org/whl/cpu"
      }
    },
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
          cmd,
          "uv pip install opencv-python",
          "uv pip install -r requirements.txt",
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
}
