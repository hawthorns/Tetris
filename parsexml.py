#!/usr/bin/env python
#coding=utf-8
import xml.dom.minidom
import sys

def main() :
    if len(sys.argv) != 2:
        sys.exit(1)

    dom = xml.dom.minidom.parse(sys.argv[1])
    rootDict = dom.documentElement.getElementsByTagName("dict")[1]
    dictChildNodes = rootDict.childNodes
    spirits = {}

    print "var spiritMap = {};"
    for dictChildNode in dictChildNodes:
        if dictChildNode.nodeName == "key":
            spiritName = dictChildNode.firstChild.nodeValue
        if dictChildNode.nodeName == "dict":
            stringNodes = dictChildNode.getElementsByTagName("string")
            spiritInfo = stringNodes[0].firstChild.nodeValue
            spiritName = spiritName.split(".")[0]
            spiritInfo = spiritInfo.replace("{", "[")
            spiritInfo = spiritInfo.replace("}", "]")
            print ("spiritMap['" + spiritName + "']" + " = " + spiritInfo + ";")
             
        #keyNode = dictNode.getElementsByTagName("key")[0]
        #print keyNode.firstChild.nodeValue
                          

if __name__ == "__main__" :
    main()

