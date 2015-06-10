__author__ = 'andy'

import urllib
import time

counter = 0

while True:

    timing_remote_file = "http://www.24h-lemans.com/wpphpFichiers/2/live/data.js?tx=000157&t=95537050"
    timing_remote_file = "http://www.24h-lemans.com/wpphpFichiers/2/live/data.js"
    current_time = int(round(time.time() * 1000))
    current_time_readable = time.strftime("%Y-%m-%d %H:%M:%S GMT", time.gmtime())
    timing_local_file = "timing-24hlemans/timing_%s.json" % (current_time)

    try:
        print ("%s - Iteration: %d, downloading %s" % (current_time_readable, counter, timing_remote_file))
        timing_file_opener = urllib.URLopener()
        timing_file_contents = timing_file_opener.retrieve(timing_remote_file, timing_local_file)
        print ("Written %s" % (timing_local_file))
    except Exception as e:
        print ("Error downloading %s to %s" % (timing_remote_file, timing_local_file))
        print (e)

    time.sleep(20)
    counter += 1