import json
import numpy as np

def load_tester(path):
    new_Title_Array=[]

    with open(path,'r',encoding='utf-8') as f:
        data = json.load(f)

    print(data)
    print("-------")
    
    for i in range(len(data['books'])):
        print(data['books'][i])
        new_Title_Array.append(data['books'][i]['title'])
        print(data['books'][i]['title'])
    return np.asarray(new_Title_Array)

np.save('table-of-contents.npy',load_tester('table-of-contents.json'))
