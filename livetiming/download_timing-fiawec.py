__author__ = 'andy'

import urllib
import time
from StringIO import StringIO
import gzip
import json
import urllib2
import math

counter = 0

while True:

    timing_remote_file = "http://live.fiawec.com/wpphpFichiers/1/live/FIAWEC/data.js"
    current_time = int(math.floor(time.time()))
    current_time_readable = time.strftime("%Y-%m-%d %H:%M:%S GMT", time.gmtime())
    timing_local_file = "timing_%s.json" % (current_time)

    try:

        #timing_remote_file_t = "%s?t=%s&tx=%s" % (timing_remote_file, current_time/15, "020000")
        timing_remote_file_t = "%s?t=%s" % (timing_remote_file, current_time/15)

        print ("%s - Iteration: %d, downloading %s" % (current_time_readable, counter, timing_remote_file_t))
        timing_file_opener = urllib.URLopener()
        timing_file_contents = timing_file_opener.retrieve(timing_remote_file_t, timing_local_file)
        print ("Written %s" % (timing_local_file))

        request = urllib2.Request(timing_remote_file_t)
        request.add_header('Accept-encoding', 'gzip')
        response = urllib2.urlopen(request)
        response_data = ""
        if response.info().get('Content-Encoding') == 'gzip':
            buf = StringIO( response.read())
            f = gzip.GzipFile(fileobj=buf)
            response_data = f.read()
        else:
            response_data = response.read()

        json_data = None
        json_data_time = None
        json_data_time_formatted = None
        json_local_track_time = None
        json_local_track_time_formatted = None
        try:
            # Attempt to parse it into JSON, then we can write out a file that is named according to the data
            #  time.
            # If we can't parse JSON out of it, we're pretty screwed. We might not be able to get a time out
            #  of it though, so that shouldn't be terminal
            json_data = json.loads(response_data)
            # The general track conditions
            print (json.dumps(json_data[1], sort_keys=True, indent=2))
            json_data_time = json_data[1].get("4")
            json_data_time_formatted = json_data_time.replace(":","").replace(" ", "")
            json_local_track_time = json_data[1].get("3")
            json_local_track_time_formatted = json_local_track_time.replace(":","").replace(" ", "")
            print ("Track time: %s - %s - %s" % (json_local_track_time, json_data_time, json_data_time_formatted))

        except Exception as e:
            print (e)

        if (json_data != None):
            if (json_data_time_formatted != None):
                output_file_name = "data-%s-%s-%s.json" % \
                                   (json_local_track_time_formatted, json_data_time_formatted, current_time)
                print ("Writing %s" % (output_file_name))
                with open(output_file_name, "w") as f:
                    json.dump(json_data, f, sort_keys=True, indent=4)
            else:
                print ("No formatted data time available")


    except Exception as e:
        print ("Error downloading %s to %s" % (timing_remote_file, timing_local_file))
        print (e)

    time.sleep(15)
    counter += 1