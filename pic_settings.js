var picType = {
  "defaultValue" : {
    "width" : 300,
    "height" : 265,
    "scale" : 2,
    "mType" : 1,
    "stockId" : "000000",
    "kType" : 1,
    "kSize" : 0
  },
  "web":{
    "kline":{
      "canvasX" : 37,
      "canvasY" : 20,
      "topX"    :0,
      "spaceButtom":15,
      "scaleStrWidth":0,
      "bg" : "#ffffff",
      "defaultColor":"#b4c5de",
      "grey" : "#d6d6d6",
      "spacePass":13,
      "upScale":0.7,
      "top":{
        "font12Size":12,
        "font12":"px \"sans-serif\"",
        "font10Size":10,
        "font10":"px \"Arial\"",
        "black" : "#000000"
      },
      "up":{
        "font9Size":10,
        "font9":"px \"sans-serif\"",
        "yRed"  : "#ff0000",
        "red"  : "#ff0000",
        "green"  : "#009400",
        "black"  : "#000000",
        "blue"  : "#0000ff",
        "pink"   : "#ff00ff",
        "white" : "#ffffff"
      },
      "middle":{
        "font9Size":10,
        "font9":"px \"Arial\"",
        "lowerBlue" : "#008be0"
      },
      "down":{
        "grey"   : "#d6d6d6",
        "black"  : "#000000",
        "blue"  : "#0000ff",
        "pink"   : "#ff00ff",
        "noline" : false
      },
      "bottom":{
        "font10Size":10,
        "font10":"px \"Arial\"",
        "showType":1,
        "black"  : "#000000",
        "blue"  : "#0000ff",
        "pink"   : "#ff00ff"
      }
    },
    "mline":{
      "canvasX" : 41,
      "canvasY" : 20,
      "topX"    :0,
      "spaceButtom":15,
      "scaleStrWidth":6,
      "spacePass":13,
      "upScale":0.8,
      "bg" : "#ffffff",
      "defaultColor":"#b4c5de",
      "frame" : "#b7c9d1",
      "headType":true,
      "top":{
        "font12Size":12,
        "font12":"px \"sans-serif\"",
        "font11Size":11,
        "font11":"px \"Arial\"",
        "red"  : "#ff0000",
        "green"  : "#009400",
        "black" : "#000000"
      },
      "up":{
        "font12Size":12,
        "font12":"px \"sans-serif\"",
        "red"  : "#ff0000",        
        "black"  : "#000000",
        "lowerBlue" : "#008be0",
        "priceColor":"#008be0",
        "avgPrice":"#000000"
      },
      "middle":{
        "font9Size":10,
        "font9":"px \"Arial\"",
        "lowerBlue" : "#008be0"
      },
      "down":{
        "grey" : "#d6d6d6",
        "volumScale":true      
      },
      "bottom":{
        "font9Size":10,
        "font9":"px \"Arial\"",
        "lowerBlue" : "#008be0"
      }      
    }
  },
  "mms":{
    "mline":{
      "canvasX" : 67,
      "canvasY" : 40,
      "topX"     : 60,
      "spaceButtom":18,
      "scaleStrWidth":0,
      "spacePass":10,
      "upScale":0.7,
      "bg" : "#000000",
      "defaultColor":"#b4c5de",
      "frame" : "#ff0000",
      "headType":false,
      "top":{
        "font12Size":20,
        "font12":"px \"YaHei Consolas Hybrid\"",
        "font11Size":19,
        "font11":"px \"Arial\"",
        "red"  : "#ff0000",
        "green"  : "#009400",
        "black" : "#f0f000"
      },
      "up":{
        "font12Size":16,
        "font12":"px \"sans-serif\"",
        "red"  : "#ff0000",        
        "black"  : "#ffffff",
        "lowerBlue" : "#00ff00",
        "priceColor":"#ffffff",
        "avgPrice":"#f0f000"
      },
      "middle" : {
        "drawMiddle" : false
      },
      "down":{
        "grey"   : "#f0f000"        
      },
      "bottom":{
        "font9Size":16,
        "font9":"px \"Arial\"",
        "lowerBlue" : "#ffffff"
      }      
    }
  },
  "lenovo":{
    "kline":{  
      "canvasX" : 37,
      "canvasY" : 20,
      "topX"    :0,
      "spaceButtom":15,
      "scaleStrWidth":0,  
      "defaultColor":"#b4c5de",
      "grey" : "white",
      "spacePass":0,
      "upScale":0.8,
      "top":{
        "font12Size":12,    
        "font12":"px \"sans-serif\"",
        "font10Size":10,
        "font10":"px \"Arial\"",
        "black" : "white"
      },
      "up":{
        "font9Size":11,
        "font9":"px \"sans-serif\"",
        "yRed"  : "white",
        "red"  : "red",
        "green"  : "#009400",
        "black"  : "red",
        "blue"  : "white",
        "pink"   : "pink",
        "white" : "#ffffff"
      },
      "down":{
        "grey"   : "white",
        "middle": "1"
      },
      "bottom":{
        "font10Size":10,
        "font10":"px \"Arial\"",
        "showType":2
      }  
    },
    "mline":{      
      "defaultColor":"#b4c5de",
      "frame" : "#b7c9d1",
      "canvasX" : 41,
      "canvasY" : 24,
      "topX"    :0,
      "spaceButtom":15,
      "scaleStrWidth":35,
      "spacePass":0,
      "upScale":0.8,
      "headType":false,
      "top":{
        "mini":true,
        "font12Size":12.5,
        "font12":"px \"sans-serif\"",
        "font11Size":11,
        "font11":"px \"Arial\"",
        "red"  : "#ff0000",
        "green"  : "#009400",
        "black" : "white"
      },
      "up":{
        "scalePercent":true,
        "font12Size":12,
        "font12":"px \"sans-serif\"",
        "red"  : "#ff0000",        
        "black"  : "white",
        "lowerBlue" : "green",
        "priceColor":"white",
        "avgPrice":"red"
      },
      "down":{
        "grey" : "white",
        "middle": "1",
        "volumScale":true   
      },
      "bottom":{
        "font9Size":12,
        "font9":"px \"Arial\"",
        "lowerBlue" : "white"
      }      
    }
  },
  "wap":{
    "mline":{
      "canvasX" : 41,
      "canvasY" : 20,
      "topX"    :0,
      "spaceButtom":15,
      "scaleStrWidth":0,
      "spacePass":12,
      "upScale":0.8,
      "bg" : "#ffffff",
      "defaultColor":"#b4c5de",
      "frame" : "#b7c9d1",
      "headType":false,
      "top":{
        "font12Size":12,
        "font12":"px \"sans-serif\"",
        "font11Size":11,
        "font11":"px \"Arial\"",
        "red"  : "#ff0000",
        "green"  : "#009400",
        "black" : "#000000"
      },
      "up":{
        "font12Size":12,
        "font12":"px \"sans-serif\"",
        "red"  : "#ff0000",        
        "black"  : "#000000",
        "lowerBlue" : "#008be0",
        "priceColor":"#008be0",
        "avgPrice":"#000000"
      },
      "middle":{
        "font9Size":10,
        "font9":"px \"Arial\"",
        "lowerBlue" : "#008be0"
      },
      "down":{
        "grey"   : "#d6d6d6"  ,
        "volumScale":true      
      },
      "bottom":{
        "font9Size":10,
        "font9":"px \"Arial\"",
        "lowerBlue" : "#008be0"
      }      
    }
  },
  "webAppBig":{
    "kline":{
      "useFundDaily" : true,
      "width" : 610,
      "height" : 470,
      "leftWidth" : 8,
      "spaceWidth" : 6,
      "lineWidth" : 2,
      "kSize" : 30,
      "canvasX" : 37,
      "canvasY" : 12,
      "topX"    :0,
      "spaceButtom":1,
      "scaleStrWidth":0,
      "bg" : "#ffffff",
      "defaultColor":"#b4c5de",
      "grey" : "#d6d6d6",
      "spacePass":46,
      "upScale" : 0.7,
      "drawTagTopRight" : true,
      "top":{
        "showType" : true,
        "font12Size":18,
        "font12":"px \"Helvetica\"",
        "font10Size":18,
        "font10":"px \"Helvetica\"",
        "black" : "#000000"
      },
      "up":{
        "useBoldFont" : true,
        "userRed" : true,
        "font9Size" : 18,
        "font9":"px \"Helvetica\"",
        "yRed"  : "#ff0000",
        "red"  : "#C90015",
        "green"  : "#008C00",
        "black"  : "#666",
        "blue"  : "#2867D9",
        "pink"   : "#E547C2",
        "white" : "#ffffff"
      },
      "middle":{
        "drawMiddle" : true,
        "useBoldFont" : true,
        "font9Size":18,
        "font9":"px \"Helvetica\"",
        "lowerBlue" : "#666"
      },
      "down":{
        "useChinese" : true,
        "fontCH" : "px \"STHeiti\"",
        "grey"   : "#999999",
        "black"  : "#000000",
        "blue"  : "#0000ff",
        "pink"   : "#ff00ff",
        "noline" : true
      },
      "bottom":{
        "useBoldFont" : true,
        "font10Size":15,
        "font10":"px \"Helvetica\"",
        "showType":1,
        "black"  : "#666666",
        "blue"  : "#2867D9",
        "pink"   : "#E547C2",
        "red"  : "#C90015",
        "green"  : "#009400"
      }      
    },
    "mline":{
      "useFundDaily" : true,
      "width" : 595,
      "height" : 466,
      "leftWidth" : 8,
      "lineWidth" : 2,
      "canvasX" : 41,
      "canvasY" : 6,
      "topX"    :0,
      "spaceButtom":15,
      "scaleStrWidth":18,
      "spacePass" : 46,
      "upScale" : 0.7525,
      "bg" : "#ffffff",
      "defaultColor":"#b4c5de",
      "frame_middle" : "#E0E0E0",
      "frame_dotted" : "#999999",
      "frame" : "#D9D9D9",
      "headType":true,
      "top":{
        "showType" : true,
        "font12Size":12,
        "font12":"px \"sans-serif\"",
        "font11Size":11,
        "font11":"px \"Arial\"",
        "red"  : "#ff0000",
        "green"  : "#009400",
        "black" : "#000000"
      },
      "up":{
        "useBoldFont" : true,
        "font12Size" : 18,
        "font12":"px \"Helvetica\"",
        "red"  : "#bc0d1f",        
        "black"  : "#666",
        "lowerBlue" : "#478c40",
        "priceColor":"#25a3e5",
        "avgPrice":"#000000"
      },
      "middle":{
        "useBoldFont" : true,
        "drawMiddle" : true,
        "font9Size":18,
        "font9":"px \"Helvetica\"",
        "lowerBlue" : "#666"
      },
      "down":{
        "font12":"px \"STHeiti\"",
        "grey"   : "#CCCCCC",
        "red"   : "#bc0d1f",
        "volumScale":true      
      },
      "bottom":{
        "useBoldFont" : true,
        "font9Size":18,
        "font9":"px \"Helvetica\"",
        "lowerBlue" : "#666"
      }      
    }
  },
  "webAppSmall":{
    "kline":{
      "width" : 610,
      "height" : 270,
      "leftWidth" : 6,
      "spaceWidth" : 6,
      "lineWidth" : 2,
      "kSize" : 30,
      "small" : true,
      "canvasX" : 37,
      "canvasY" : 12,
      "topX"    :0,
      "spaceButtom":15,
      "scaleStrWidth":0,
      "bg" : "#ffffff",
      "defaultColor":"#b4c5de",
      "grey" : "#d6d6d6",
      "spacePass":46,
      "upScale" : 0.7525,
      "drawTagTopRight" : true,
      "top":{
        "showType" : true,
        "font12Size":18,
        "font12":"px \"Helvetica\"",
        "font10Size":18,
        "font10":"px \"Helvetica\"",
        "black" : "#000000"
      },
      "up":{
        "useBoldFont" : true,
        "userRed" : true,
        "font9Size" : 18,
        "font9":"px \"Helvetica\"",
        "yRed"  : "#ff0000",
        "red"  : "#C90015",
        "green"  : "#008C00",
        "black"  : "#666",
        "blue"  : "#2867D9",
        "pink"   : "#E547C2",
        "white" : "#ffffff"
      },
      "middle":{
        "drawMiddle" : true,
        "useBoldFont" : true,
        "font9Size":18,
        "font9":"px \"Helvetica\"",
        "lowerBlue" : "#666"
      },
      "down":{
        "useChinese" : true,
        "fontCH" : "px \"STHeiti\"",
        "grey"   : "#999999",
        "black"  : "#000000",
        "blue"  : "#0000ff",
        "pink"   : "#ff00ff",
        "noline" : true
      },
      "bottom":{
        "useBoldFont" : true,
        "font10Size":15,
        "font10":"px \"Helvetica\"",
        "showType":1,
        "black"  : "#666666",
        "blue"  : "#2867D9",
        "pink"   : "#E547C2"
      }      
    },
    "mline":{
      "small" : true,
      "width" : 595,
      "height" : 275,
      "leftWidth" : 6,
      "lineWidth" : 2,
      "canvasX" : 41,
      "canvasY" : 6,
      "topX"    :0,
      "spaceButtom":15,
      "scaleStrWidth":18,
      "spacePass" : 46,
      "upScale" : 0.7525,
      "bg" : "#ffffff",
      "defaultColor":"#b4c5de",
      "frame_middle" : "#E0E0E0",
      "frame_dotted" : "#999999",
      "frame" : "#D9D9D9",
      "headType":true,
      "top":{
        "showType" : true,
        "font12Size":12,
        "font12":"px \"sans-serif\"",
        "font11Size":11,
        "font11":"px \"Arial\"",
        "red"  : "#ff0000",
        "green"  : "#009400",
        "black" : "#000000"
      },
      "up":{
        "useBoldFont" : true,
        "font12Size" : 18,
        "font12":"px \"Helvetica\"",
        "red"  : "#bc0d1f",        
        "black"  : "#666",
        "lowerBlue" : "#478c40",
        "priceColor":"#25a3e5",
        "avgPrice":"#000000"
      },
      "middle":{
        "useBoldFont" : true,
        "drawMiddle" : true,
        "font9Size":18,
        "font9":"px \"Helvetica\"",
        "lowerBlue" : "#666"
      },
      "down":{
        "font12":"px \"STHeiti\"",
        "grey"   : "#CCCCCC",
        "red"   : "#bc0d1f",
        "volumScale":true      
      },
      "bottom":{
        "useBoldFont" : true,
        "font9Size":18,
        "font9":"px \"Helvetica\"",
        "lowerBlue" : "#666"
      }
    }
  },
  "webAppMainPage":{
    "mline":{
      "small" : true,
      "width" : 405,
      "height" : 190,
      "leftWidth" : 6,
      "lineWidth" : 2,
      "canvasX" : 41,
      "canvasY" : 6,
      "topX"    :0,
      "spaceButtom":15,
      "scaleStrWidth":16,
      "spacePass" : 46,
      "upScale" : 0.7525,
      "bg" : "#ffffff",
      "defaultColor":"#b4c5de",
      "frame_middle" : "#E0E0E0",
      "frame_dotted" : "#999999",
      "frame" : "#D9D9D9",
      "headType":true,
      "top":{
        "showType" : true,
        "font12Size":12,
        "font12":"px \"sans-serif\"",
        "font11Size":11,
        "font11":"px \"Arial\"",
        "red"  : "#ff0000",
        "green"  : "#009400",
        "black" : "#000000"
      },
      "up":{
        "useBoldFont" : true,
        "font12Size" : 16,
        "font12":"px \"Helvetica\"",
        "red"  : "#bc0d1f",        
        "black"  : "#666",
        "lowerBlue" : "#478c40",
        "priceColor":"#25a3e5",
        "avgPrice":"#000000"
      },
      "middle":{
        "useBoldFont" : true,
        "drawMiddle" : true,
        "font9Size":18,
        "font9":"px \"Helvetica\"",
        "lowerBlue" : "#666"
      },
      "down":{
        "font12":"px \"STHeiti\"",
        "grey"   : "#CCCCCC",
        "red"   : "#bc0d1f",
        "volumScale":true
      },
      "bottom":{
        "useBoldFont" : true,
        "font9Size":16,
        "font9":"px \"Helvetica\"",
        "lowerBlue" : "#666"
      }      
    }
  },
  "webAppTrend":{
    "mline":{
      "small" : true,
      "isTrendPic" : true,
      "width" : 216,
      "height" : 100,
      "leftWidth" : 6,
      "lineWidth" : 2,
      "canvasX" : 6,
      "canvasY" : 6,
      "topX"    :0,
      "spaceButtom":2,
      "scaleStrWidth":4,
      "spacePass" : 46,
      "upScale" : 0.7525,
      "bg" : "#ffffff",
      "defaultColor":"#b4c5de",
      "frame_middle" : "#E0E0E0",
      "frame_dotted" : "#999999",
      "frame" : "#D9D9D9",
      "headType":true,
      "top":{
        "showType" : true,
        "font12Size":12,
        "font12":"px \"sans-serif\"",
        "font11Size":11,
        "font11":"px \"Arial\"",
        "red"  : "#ff0000",
        "green"  : "#009400",
        "black" : "#000000"
      },
      "up":{
        "blue" : '#DEF6FF',
        "boxColor" : '#ededed',
        "useBoldFont" : true,
        "font12Size" : 16,
        "font12":"px \"Helvetica\"",
        "red"  : "#bc0d1f",        
        "black"  : "#666",
        "lowerBlue" : "#478c40",
        "priceColor":"#81dcf7",
        "avgPrice":"#000000"
      },
      "middle":{
        "useBoldFont" : true,
        "drawMiddle" : true,
        "font9Size":18,
        "font9":"px \"Helvetica\"",
        "lowerBlue" : "#666"
      },
      "down":{
        "font12":"px \"STHeiti\"",
        "grey"   : "#CCCCCC",
        "red"   : "#bc0d1f",
        "volumScale":true      
      },
      "bottom":{
        "useBoldFont" : true,
        "font9Size":16,
        "font9":"px \"Helvetica\"",
        "lowerBlue" : "#666"
      }
    }
  },
  "gupiao123":{
    "kline":{
      "width" : 220,
      "height" : 130,
      "canvasX" : 37,
      "canvasY" : 20,
      "kSize" : 30,
      "topX"    :0,
      "spaceButtom":15,
      "scaleStrWidth":0,
      "bg" : "#ffffff",
      "defaultColor":"#b4c5de",
      "grey" : "#d6d6d6",
      "spacePass":13,
      "upScale":0.7,
      "top":{
        "font12Size":12,
        "font12":"px \"sans-serif\"",
        "font10Size":10,
        "font10":"px \"Arial\"",
        "black" : "#000000"
      },
      "up":{
        "font9Size":10,
        "font9":"px \"sans-serif\"",
        "yRed"  : "#ff0000",
        "red"  : "#ff0000",
        "green"  : "#009400",
        "black"  : "#000000",
        "blue"  : "#0000ff",
        "pink"   : "#ff00ff",
        "white" : "#ffffff"
      },
      "middle":{
        "font9Size":10,
        "font9":"px \"Arial\"",
        "lowerBlue" : "#008be0"
      },
      "down":{
        "grey"   : "#d6d6d6",
        "black"  : "#000000",
        "blue"  : "#0000ff",
        "pink"   : "#ff00ff",
        "noline" : false
      },
      "bottom":{
        "font10Size":10,
        "font10":"px \"Arial\"",
        "showType":1,
        "black"  : "#000000",
        "blue"  : "#0000ff",
        "pink"   : "#ff00ff"
      }      
    },
    "mline":{
      "width" : 220,
      "height" : 130,
      "canvasX" : 41,
      "canvasY" : 20,
      "topX"    :0,
      "spaceButtom":15,
      "scaleStrWidth":6,
      "spacePass":13,
      "upScale":0.8,
      "bg" : "#ffffff",
      "defaultColor":"#b4c5de",
      "frame" : "#b7c9d1",
      "headType":false,
      "top":{
        "font12Size":12,
        "font12":"px \"sans-serif\"",
        "font11Size":11,
        "font11":"px \"Arial\"",
        "red"  : "#ff0000",
        "green"  : "#009400",
        "black" : "#000000"
      },
      "up":{
        "font12Size":12,
        "font12":"px \"sans-serif\"",
        "red"  : "#ff0000",        
        "black"  : "#000000",
        "lowerBlue" : "#008be0",
        "priceColor":"#008be0",
        "avgPrice":"#000000"
      },
      "middle":{
        "font9Size":10,
        "font9":"px \"Arial\"",
        "lowerBlue" : "#008be0"
      },
      "down":{
        "grey"   : "#d6d6d6"  ,
        "volumScale":true      
      },
      "bottom":{
        "font9Size":10,
        "font9":"px \"Arial\"",
        "lowerBlue" : "#008be0"
      }
    }
  },
  "gupiao123Big":{
    "kline":{
      "width" : 400,
      "height" : 273,
      "canvasX" : 37,
      "canvasY" : 20,
      "topX"    :0,
      "spaceButtom":15,
      "scaleStrWidth":0,
      "bg" : "#ffffff",
      "defaultColor":"#b4c5de",
      "grey" : "#d6d6d6",
      "spacePass":13,
      "upScale":0.7,
      "top":{
        "font12Size":12,
        "font12":"px \"sans-serif\"",
        "font10Size":10,
        "font10":"px \"Arial\"",
        "black" : "#000000"
      },
      "up":{
        "font9Size":10,
        "font9":"px \"sans-serif\"",
        "yRed"  : "#ff0000",
        "red"  : "#ff0000",
        "green"  : "#009400",
        "black"  : "#000000",
        "blue"  : "#0000ff",
        "pink"   : "#ff00ff",
        "white" : "#ffffff"
      },
      "middle":{
        "font9Size":10,
        "font9":"px \"Arial\"",
        "lowerBlue" : "#008be0"
      },
      "down":{
        "grey"   : "#d6d6d6",
        "black"  : "#000000",
        "blue"  : "#0000ff",
        "pink"   : "#ff00ff",
        "noline" : false
      },
      "bottom":{
        "font10Size":10,
        "font10":"px \"Arial\"",
        "showType":1,
        "black"  : "#000000",
        "blue"  : "#0000ff",
        "pink"   : "#ff00ff"
      }      
    },
    "mline":{
      "width" : 400,
      "height" : 273,
      "canvasX" : 41,
      "canvasY" : 20,
      "topX"    :0,
      "spaceButtom":15,
      "scaleStrWidth":6,
      "spacePass":13,
      "upScale":0.8,
      "bg" : "#ffffff",
      "defaultColor":"#b4c5de",
      "frame" : "#b7c9d1",
      "headType":false,
      "top":{
        "font12Size":12,
        "font12":"px \"sans-serif\"",
        "font11Size":11,
        "font11":"px \"Arial\"",
        "red"  : "#ff0000",
        "green"  : "#009400",
        "black" : "#000000"
      },
      "up":{
        "font12Size":12,
        "font12":"px \"sans-serif\"",
        "red"  : "#ff0000",        
        "black"  : "#000000",
        "lowerBlue" : "#008be0",
        "priceColor":"#008be0",
        "avgPrice":"#000000"
      },
      "middle":{
        "font9Size":10,
        "font9":"px \"Arial\"",
        "lowerBlue" : "#008be0"
      },
      "down":{
        "grey"   : "#d6d6d6"  ,
        "volumScale":true      
      },
      "bottom":{
        "font9Size":10,
        "font9":"px \"Arial\"",
        "lowerBlue" : "#008be0"
      }      
    }
  },
  "gupiao123V3":{
    "kline":{
      "width" : 300,
      "height" : 180,
      "kSize" : 30,
      "spaceHeight" : 2,
      "spaceWidth" : 2,
      "dashed" : 1,
      "lineWidth" : 1,
      "canvasX" : 37,
      "canvasY" : 20,
      "topX"    :0,
      "spaceButtom":15,
      "scaleStrWidth":0,
      "bg" : "#ffffff",
      "defaultColor":"#b4c5de",
      "grey" : "#d6d6d6",
      "spacePass":13,
      "upScale":0.7,
      "top":{
        "font12Size":12,
        "font12":"px \"sans-serif\"",
        "font10Size":11,
        "font10":"px \"Arial\"",
        "black" : "#000000"
      },
      "up":{
        "font9Size":12,
        "font9":"px \"sans-serif\"",
        "yRed"  : "#ff0000",
        "red"  : "#ff0000",
        "green"  : "#009400",
        "black"  : "#000000",
        "blue"  : "#0000ff",
        "pink"   : "#ff00ff",
        "white" : "#ffffff"
      },
      "middle":{
        "font9Size":11,
        "font9":"px \"Arial\"",
        "lowerBlue" : "#008be0"
      },
      "down":{
        "grey"   : "#d6d6d6",
        "black"  : "#000000",
        "blue"  : "#0000ff",
        "pink"   : "#ff00ff",
        "noline" : false
      },
      "bottom":{
        "font10Size":11,
        "font10":"px \"Arial\"",
        "showType":1,
        "black"  : "#000000",
        "blue"  : "#0000ff",
        "pink"   : "#ff00ff"
      }      
    },
    "mline":{
      "width" : 300,
      "height" : 180,
      "spaceHeight" : 2,
      "spaceWidth" : 2,
      "dashed" : 1,
      "lineWidth" : 1,
      "canvasX" : 41,
      "canvasY" : 20,
      "topX"    :0,
      "spaceButtom":15,
      "scaleStrWidth":6,
      "spacePass":13,
      "upScale":0.8,
      "bg" : "#ffffff",
      "defaultColor":"#b4c5de",
      "frame" : "#b7c9d1",
      "headType":false,
      "top":{
        "font12Size":12,
        "font12":"px \"sans-serif\"",
        "font11Size":11,
        "font11":"px \"Arial\"",
        "red"  : "#ff0000",
        "green"  : "#009400",
        "black" : "#000000"
      },
      "up":{
        "font12Size":12,
        "font12":"px \"sans-serif\"",
        "red"  : "#ff0000",        
        "black"  : "#000000",
        "lowerBlue" : "#008be0",
        "priceColor":"#008be0",
        "avgPrice":"#000000"
      },
      "middle":{
        "font9Size":11,
        "font9":"px \"Arial\"",
        "lowerBlue" : "#008be0"
      },
      "down":{
        "grey"   : "#d6d6d6"  ,
        "volumScale":true      
      },
      "bottom":{
        "font9Size":11,
        "font9":"px \"Arial\"",
        "lowerBlue" : "#008be0"
      }      
    }
  },
  "gupiao123V3Big":{
    "kline":{
      "width" : 600,
      "height" : 360,
      "kSize" : 30,
      "spaceHeight" : 5,
      "spaceWidth" : 5,
      "dashed" : 3,
      "lineWidth" : 2,
      "canvasX" : 37,
      "canvasY" : 26,
      "topX"    :0,
      "spaceButtom":15,
      "scaleStrWidth":0,
      "bg" : "#ffffff",
      "defaultColor":"#b4c5de",
      "grey" : "#d6d6d6",
      "spacePass":13,
      "upScale":0.7,
      "top":{
        "font12Size":24,
        "font12":"px \"sans-serif\"",
        "font10Size":23,
        "font10":"px \"Arial\"",
        "black" : "#000000"
      },
      "up":{
        "font9Size":24,
        "font9":"px \"sans-serif\"",
        "yRed"  : "#ff0000",
        "red"  : "#ff0000",
        "green"  : "#009400",
        "black"  : "#000000",
        "blue"  : "#0000ff",
        "pink"   : "#ff00ff",
        "white" : "#ffffff"
      },
      "middle":{
        "font9Size":22,
        "font9":"px \"Arial\"",
        "lowerBlue" : "#008be0"
      },
      "down":{
        "grey"   : "#d6d6d6",
        "black"  : "#000000",
        "blue"  : "#0000ff",
        "pink"   : "#ff00ff",
        "noline" : false
      },
      "bottom":{
        "font10Size":22,
        "font10":"px \"Arial\"",
        "showType":1,
        "black"  : "#000000",
        "blue"  : "#0000ff",
        "pink"   : "#ff00ff"
      }
    },
    "mline":{
      "width" : 600,
      "height" : 360,
      "spaceHeight" : 5,
      "spaceWidth" : 5,
      "dashed" : 3,
      "lineWidth" : 2,
      "canvasX" : 41,
      "canvasY" : 26,
      "topX"    :0,
      "spaceButtom":15,
      "scaleStrWidth":12,
      "spacePass":13,
      "upScale":0.8,
      "bg" : "#ffffff",
      "defaultColor":"#b4c5de",
      "frame" : "#b7c9d1",
      "headType":false,
      "top":{
        "font12Size":24,
        "font12":"px \"sans-serif\"",
        "font11Size":23,
        "font11":"px \"Arial\"",
        "red"  : "#ff0000",
        "green"  : "#009400",
        "black" : "#000000"
      },
      "up":{
        "font12Size":24,
        "font12":"px \"sans-serif\"",
        "red"  : "#ff0000",        
        "black"  : "#000000",
        "lowerBlue" : "#008be0",
        "priceColor":"#008be0",
        "avgPrice":"#000000"
      },
      "middle":{
        "font9Size":22,
        "font9":"px \"Arial\"",
        "lowerBlue" : "#008be0"
      },
      "down":{
        "grey"   : "#d6d6d6"  ,
        "volumScale":true      
      },
      "bottom":{
        "font9Size":22,
        "font9":"px \"Arial\"",
        "lowerBlue" : "#008be0"
      }      
    }
  },
  "version": "1.0"
};

if(typeof exports === 'object') {
  exports.picType = picType;
}