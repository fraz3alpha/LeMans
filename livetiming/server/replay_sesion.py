import time
from os import listdir
from os.path import isfile, join
import shutil

mypath = "test_data"
targetpath = "data"

onlyfiles = [ f for f in listdir(mypath) if isfile(join(mypath,f)) ]

previous_t = None
for filename in sorted(onlyfiles):
  src = join(mypath, filename)
  dst = join(targetpath, "data.json")
  parts = filename.split("-")
  t = parts[1]
  print (filename)
  if t != previous_t:
    shutil.copyfile(src,dst)
    time.sleep(1)
    previous_t = t
