# FP16 半精度模型使用分析

## 当前状态

**默认情况下，代码不使用半精度模型（FP16）**

### 原因分析

1. **命令行参数定义**（第 28 行）：
```python
parser.add_argument("--fp16", action="store_true", default=False, help="Use FP16 for inference if available")
```
   - `default=False` 表示默认值为 `False`
   - `action="store_true"` 表示只有显式传入 `--fp16` 参数时才会设置为 `True`

2. **TTS 初始化**（第 48-52 行）：
```python
tts = IndexTTS2(model_dir=cmd_args.model_dir,
                cfg_path=os.path.join(cmd_args.model_dir, "config.yaml"),
                use_fp16=cmd_args.fp16,  # 这里使用 cmd_args.fp16，默认是 False
                ...
                )
```

## 如何启用半精度模型

### 方法 1：命令行参数（推荐）
运行时添加 `--fp16` 参数：
```bash
python your_script.py --fp16
```

### 方法 2：修改代码默认值
将参数定义的默认值改为 `True`：
```python
parser.add_argument("--fp16", action="store_true", default=True, help="Use FP16 for inference if available")
```

### 方法 3：强制启用（不推荐）
直接在 TTS 初始化时强制设置为 `True`：
```python
tts = IndexTTS2(model_dir=cmd_args.model_dir,
                cfg_path=os.path.join(cmd_args.model_dir, "config.yaml"),
                use_fp16=True,  # 强制启用
                ...
                )
```

## 注意事项

- FP16 可以**提高推理速度**和**降低显存占用**
- 但可能会**略微降低精度**（通常影响很小）
- 需要 GPU 支持 FP16 计算（现代 GPU 通常都支持）
- 如果模型本身不是 FP16 格式，运行时转换可能会有轻微性能开销

