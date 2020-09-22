import json
import numpy as np

def load_tester(path):
    with open(path,'r',encoding='utf-8') as f:
        data = json.load(f)
    print(data)
    return np.asarray(data)

np.save('table-of-contents.npy',load_tester('table-of-contents.json'))
