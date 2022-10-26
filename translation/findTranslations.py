#This file tries to identify and print a csv file for all the needed translations in a file
#--> python3 findTransations.py pathToTheFile1 pathToTheFileN

import sys
import re

files = sys.argv[1:len(sys.argv)]
print(files)

csv = ""
csvEn = ""
for fn in files:
    file = open(fn)

    df = file.read()
    matchs = ""
    
    matchs = re.findall(r'\{.*?\}', df)


    for m in matchs:
        m = m.replace('{','').replace('}','')
        csv += m+",\n"
        csvEn += m+","+m+"\n"

    file.close()

print(csv)
print()
print(csvEn)