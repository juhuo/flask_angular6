import json
import logging
import uuid

def get_bar_file_name(userId, indexId):
    """  userId, indexId mapped to file name. 
         userid: 1,3,7 => week, month, 3-month upstream data
         userid: 2,4,8 => week, month, 3-month downstream data
         IndexId is the n-th data from the file.
         such as,
             ccmts_1.dat upstream data
             ccmts_2.dat downstream data 

             ccmts_1_0.dat is the 3rd label ccmts_1.dat
             ccmts_1_3.dat is the 3rd label ccmts_1.dat 

             ccmts_8_3.dat is the 3rd label ccmts_8.dat 
    """
    
    return "data/ccmts_"+userId+"_"+indexId+".dat"

def get_line_file_name(userId):
    return "data/ccmts_"+userId+".dat"

def get_json_chart_data(userId, indexId):

    if userId is None:
        # not used case NOW, remove from path
        fname ="data/ccmts.dat"
    elif indexId is None:
        fname = get_line_file_name(userId);
    else:
        fname = get_bar_file_name(userId, indexId)

    print("get data from file: ", userId, indexId, fname)
    with open(fname) as f:
        data = json.load(f)

    return data
    