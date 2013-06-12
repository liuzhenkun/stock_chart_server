/**
 * K线画图模块
 * @param String wtype    产品类型，web，wap，mms，lenovo
 * @param Object ctx      画图对象
 * @param Integer width   图片宽度
 * @param Integer height  图片高度
 * @param Object kline    K线JOSN格式数据
 * @param Integer kSize   K线大小
 * @param Object fontSize 字体大小集合
 * @param Object picType  图片配置文件
 * @param Integer scale 图片缩放的倍数
 * @param Boolean drawVolAvgLineFlag 是否画成交量均线
 * @param Integer pixRatio 显示器像素比， 前端调用动态的传入， 后端此值横为1
 */
var KLineView = function (wtype, ctx, width, height, kline, kSize, fontSize, picType, scale, drawVolAvgLineFlag, pixRatio) {
  'use strict';
  // 放大图片
  // 将图形的宽和高都扩大scale倍
  width *= scale;
  height *= scale;

  var pType = picType[wtype],
    dataPrice = null, //保存最大根数的成交价格和成交量
    dataVolum = null,
    kType = 0,
    SCALE_SIZE = 5,
    maxVolumn = 0,
    minVolumn = 999999999,
    maxPrice = 0,
    minPrice = 999999999,
    maxFundDailyVolum = 0,
    scalePrices = [], // 价格刻度
    sType = "日",
    upbox = {}, // 上框价格区属性集合
    downbox = {}, // 下框成交量属性集合
    fundBox = {}, // 最下面日资金流量属性集合
    canvas = {}, // 图片区域属性集合
    canvasX = fontSize.canvasx, // 价格及成交量区域起始X坐标
    canvasY = fontSize.canvasy, // 价格及成交量区域起始Y坐标
    spaceButtom  = pType.spaceButtom || 15, // 底部显示文字区域的高度,
    maxShowNum  = 100,
    candleWidth = 4 * scale, // 相邻点之间的间隔
    spacePass,
    spaceWidth,
    lineWidth,
    spaceHeight, // 空白高度， 即：顶部信息与upbox的距离， 或者中部信息与上下边框的距离
    dashed,
    leftWidth;
  if (pType && pType.kline) {
    pType = pType.kline;
  } else {
    pType = picType.web.kline;
  }

  if (!drawVolAvgLineFlag) {
    pType.down.noline = true;
  }

  fontSize = fontSize || {};

  // 后端放大Scale倍
  fontSize.spaceHeight = fontSize.spaceHeight * scale;
  fontSize.lineWidth *= scale;
  fontSize.spaceWidth *= scale;
  fontSize.dashed *= scale;
  fontSize.leftWidth = fontSize.leftWidth * scale;
  // 前端放大pixRatio倍
  fontSize.spaceHeight = fontSize.spaceHeight * pixRatio;
  fontSize.lineWidth *= pixRatio;
  fontSize.spaceWidth *= pixRatio;
  fontSize.dashed *= pixRatio;
  fontSize.leftWidth = fontSize.leftWidth * pixRatio;
  // fontSize.topf12 = fontSize.topf12;
  fontSize.topf10 = fontSize.topf11;
  fontSize.upf9 = fontSize.upf12;
  // fontSize.midf9 = fontSize.midf9;
  fontSize.btmf10 = fontSize.btmf9;

  // 前端调用不使用后端缩放， scale恒为1， 但是对于高分屏要按像素比放大
  // 后端调用使用后端缩放， scale默认为2， pixRatio不存在恒为1
  fontSize.topf12 *= pixRatio;
  fontSize.topf10 *= pixRatio;
  fontSize.upf9 *= pixRatio;
  fontSize.midf9 *= pixRatio;
  fontSize.btmf10 *= pixRatio;

  fontSize.topf12 *= scale;
  fontSize.topf10 *= scale;
  fontSize.upf9 *= scale;
  fontSize.midf9 *= scale;
  fontSize.btmf10 *= scale;

  scalePrices.length = SCALE_SIZE;
  spacePass = pType.spacePass || 13; // 中部空白的高度
  spaceWidth = fontSize.spaceWidth || 2;// 空白宽度  
  lineWidth = fontSize.lineWidth || 1; // 线条的宽度
  spaceHeight = fontSize.spaceHeight || 0; // 留下空白的高度
  dashed = fontSize.dashed || 1; // 虚线的间隔
  leftWidth = fontSize.leftWidth || 0;

  canvasX *= scale;
  canvasY *= scale;
  spaceButtom *= scale;
  spacePass *= scale;

  canvasX *= pixRatio;
  canvasY *= pixRatio;
  spaceButtom *= pixRatio;
  spacePass *= pixRatio;

  function initImage() {
    var demoStockName = "A",
      demoPrice = "000.00",
      demoMidTime = "9",
      demoBtm = "M",
      font = ctx.font,
      wh = 0,
      bold = '',
      upf9;

    ctx.font = fontSize.topf10 + pType.top.font10;
    if (fontSize.topf10 < fontSize.topf12) {
      ctx.font = fontSize.topf12 + pType.top.font12;
    }
    if (!pType.top.showType) {
      // if (ctx.measureText(demoStockName).emHeightAscent) {
      //   wh = ctx.measureText(demoStockName).emHeightAscent + 2;
      // } else {
      wh = fontSize.topf12;
      // }

      if (canvasY < wh) {
        canvasY = wh;
      }
    }
    upf9 = fontSize.upf9;
    if (pType.up.useBoldFont) {
      bold = 'bold ';
    }
    ctx.font = bold + upf9 + pType.up.font9;
    wh =  ctx.measureText(demoPrice).width + 5 + leftWidth;
    if (canvasX < wh) {
      canvasX = wh;
    }
    ctx.font = bold + fontSize.btmf10 + pType.bottom.font10;
    // if (ctx.measureText(demoBtm).emHeightAscent) {
    //   wh =  ctx.measureText(demoBtm).emHeightAscent;
    // } else {
    wh = fontSize.btmf10;
    // }
    if (spaceButtom < wh) {
      spaceButtom = wh;
    }
    if (pType.middle) {
      ctx.font = bold + fontSize.midf9 + pType.middle.font9;
      // if (ctx.measureText(demoMidTime).emHeightAscent) {
      //   wh =  ctx.measureText(demoMidTime).emHeightAscent;
      // } else {
      wh = fontSize.midf9;
      // }
      if (spacePass < wh) {
        spacePass = wh;
      }
    }
    ctx.font = font;
  }// end function initImage

  function getKLineType(sType) {
    var chinese = null;
    switch (sType) {
    case 7:
      chinese = "5分钟";
      break;
    case 8:
      chinese = "15分钟";
      break;
    case 9:
      chinese = "30分钟";
      break;
    case 10:
      chinese = "60分钟";
      break;
    case 1:
      chinese = "日";
      break;
    case 2:
      chinese = "周";
      break;
    case 3:
      chinese = "月";
      break;
    case 4:
      chinese = "季";
      break;
    case 5:
      chinese = "半年";
      break;
    case 6:
      chinese = "年";
      break;
    default:
      chinese = "日";
      break;
    }
    return chinese;
  }// end function getKLineType

  this.setKType = function (kKType) {
    kType = kKType;
    sType = getKLineType(kType);
  };

  function drawLine(x, y, w, h, color, lw) {
    x = parseInt(x, 10) + 0.5;
    ctx.beginPath();
    lw = lineWidth - (lw || 0);
    if (!color) {
      color = pType.defaultColor;
    }
    ctx.lineWidth = lw;
    ctx.moveTo(x, y);
    ctx.lineTo(w, h);
    ctx.strokeStyle = color;
    ctx.stroke();
  }// end function drawLine

  function drawDashedLine(x, y, w, h, color, lw) {
    var i,
      k,
      perLeft,
      perTop,
      rectWidth = 1,
      rectHeight = 1;

    x = parseInt(x, 10) + 0.5;
    ctx.beginPath();
    lw = lineWidth - (lw || 0);
    if (!color) {
      color = pType.defaultColor;
    }
    ctx.lineWidth = lw;
    if (pType.middle.drawMiddle) {
      rectWidth = pixRatio * scale;
      rectHeight = pixRatio * scale;
      ctx.lineWidth = pType.lineWidth / 2 * pixRatio * scale;
    }
    i = parseInt((h - y) / 3, 10);
    if (i === 0) {
      i = parseInt((w - x) / 3, 10);
    }
    perLeft = parseFloat((w - x) / i);
    perTop = parseFloat((h - y) / i);
    for (k = 0; k < i; k += dashed) {
      ctx.rect(x + k * perLeft, y + k * perTop, rectWidth, rectHeight);
    }
    ctx.strokeStyle = color;
    ctx.stroke();
  }// end function drawDashedLine

  function drawString(text, x, y, color) {
    x = parseInt(x, 10) + 0.5;
    if (color) {
      ctx.fillStyle = color;
    }
    ctx.fillText(text, x, y);
  }// end function drawString

  /**
   * 计算均线数据
   * @param value 给定数据
   * @param num 需要计算的均线跨度
   * @return
   */
  // var calData1 = function (value, num) {
  //   var data = [value.length];
  //   var counter = 0;
  //   var i;
  //   for (i = 0; i < value.length; i++) {
  //     var sum = value[i],
  //     for (beforeCounter = 1; beforeCounter < num && beforeCounter <= counter; beforeCounter++) {
  //       sum += value[parseInt(counter - beforeCounter, 10)];
  //     }
  //     data[counter] = sum / beforeCounter;
  //     counter++;
  //   }
  //   return data;
  // };

  function calData2(nflag, num, maxNum) {
    var index = 0,
      metaData,
      data,
      i;

    if (num === 10) {
      index = 1;
    } else if (num === 30) {
      index = 2;
    }
    metaData =  kline.kLine.dataValue;
    data = [];
    data.length = metaData.length;
    for (i = 0; i < metaData.length; i += 1) {
      data[i] = metaData[i][nflag === 0 ? 7 : 8][index];
    }
    return data;
  }// end function calData2

  function checkMaxVP(nFlag, num) {
    var avgData = calData2(nFlag, num, maxShowNum),
      i;
    for (i = 0; i < avgData.length; i += 1) {
      if (avgData[i] > 0) {
        if (nFlag === 0) {
          if (avgData[i] > maxPrice) {
            maxPrice = avgData[i];
          }
          if (avgData[i] < minPrice) {
            minPrice = avgData[i];
          }
        } else {
          if (avgData[i] > maxVolumn) {
            maxVolumn = avgData[i];
          }
          if (avgData[i] < minVolumn) {
            minVolumn = avgData[i];
          }
        }
      }
    }
  }// end function checkMaxVP

  function calculate() {
    var data = kline.kLine.dataValue,
      maxShowPrice = 0,
      minShowPrice = 0,
      difPrice = 0,
      i,
      j,
      k,
      hightPrice,
      lowPrice,
      volumn,
      fundData;

    if (data.length > 0) {
      //计算最大最小成交价与成交量
      if (data.length > 0 && data[0][1]) {
        for (i = 0; i < data.length; i += 1) {
          if (data[i][1] === 0) {
            data[i][1] = data[i][2];
            if (data[i][1] < data[i][4]) {
              data[i][1] = data[i][4];
            }
          }
          if (data[i][3] === 0) {
            data[i][3] = data[i][2];
            if (data[i][3] > data[i][4] && data[i][4] > 0) {
              data[i][3] = data[i][4];
            }
          }
          hightPrice = data[i][1];
          lowPrice = data[i][3];
          if (data[i][5] === 0 && data[i][4] > 0) {
            data[i][5] = parseInt(data[i][6] / data[i][4], 10);
          }
          volumn = data[i][5];
          if (hightPrice > maxPrice) {
            maxPrice = hightPrice;
          }
          if (lowPrice < minPrice) {
            minPrice = lowPrice;
          }

          if (volumn > maxVolumn) {
            maxVolumn = volumn;
          }
          if (volumn < minVolumn) {
            minVolumn = volumn;
          }

          // maxFundDailyVolum 计算获取资金流向数据绝对值的最大值
          if (Math.abs(data[i][9]) > maxFundDailyVolum) {
            maxFundDailyVolum = Math.abs(data[i][9]);
          }
        }

        // 从5，10，30均线中找到成交价的最大和最小值
        checkMaxVP(0, 5);
        checkMaxVP(0, 10);
        checkMaxVP(0, 30);
        // 从5，10，30均线中找到成交额的最大和最小值
        checkMaxVP(1, 5);
        checkMaxVP(1, 10);
        checkMaxVP(1, 30);
        if (maxPrice === minPrice) {
          maxPrice = maxPrice + 0.01;
          minPrice = minPrice - 0.01;
        }
        // 放大和缩小最大最小值
        maxShowPrice = maxPrice + maxPrice * 0.002;
        minShowPrice = minPrice - minPrice * 0.002;
      } else {
        maxVolumn = 0;
        minVolumn = 0;
      }
      difPrice = maxShowPrice - minShowPrice;
    } // end if(data.length > 0)

    //计算刻度值
    for (k = 0; k < SCALE_SIZE; k += 1) {
      scalePrices[k] = k / (SCALE_SIZE - 1) * difPrice + minShowPrice;
      if (kline.stockInfo.dataValue[6] === 'Y') {
        scalePrices[k] = parseInt(scalePrices[k], 10);
      } else {
        if (scalePrices[k] < 2) {
          scalePrices[k] = scalePrices[k].toFixed(3);
        } else {
          scalePrices[k] = scalePrices[k].toFixed(2);
        }
      }
    } // end for loop

    // maxFundDailyVolum 计算获取资金流向数据绝对值的最大值
    // fundData是日资金流向数据
    // fundData = [];
    // if (fundDailyData && pType.useFundDaily) {
    //   fundData = fundDailyData.dataValue[0][2];
    //   for (j = 0; j < fundData.length; j += 1) {
    //     if (Math.abs(fundData[j][1]) > maxFundDailyVolum) {
    //       maxFundDailyVolum = Math.abs(fundData[j][1]);
    //     }
    //   }
    // }
  }// end function calculate

  function drawBaseFrame() {
    var tab1Cy,
      z,
      i,
      y,
      timeSplieWidth = upbox.width / 4,
      bold = '',
      upf9,
      marginTop = 3,
      maxWidth = 4,
      redForScale = pType.up.yRed,
      more = 0,
      nVolum = maxVolumn,
      yTop = 0,
      sVolum,
      data = kline.kLine.dataValue,
      textOffSetX,
      stockName,
      stockID,
      desc,
      d,
      boldMiddle = '',
      time,
      kLength,
      middleLeftY,
      date,
      middleRightY,
      boldBottom = '',
      demo_desc = "MA30",
      descWidth,
      descHeight,
      belowYPosition,
      belowMa5XPosition,
      belowMa10XPosition,
      belowMa30XPosition,
      maUpboxLen = 8 + 4, // MA标志距upbox的距离， 同是也是MA30距离upbox右边框的距离
      maBetweenLen = 14, // MA标志之间的距离,
      topVariable = 3,
      middleVariable = 3,
      bottomVariable = 3;

    //边框
    ctx.linCap = 'butt';
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    if (pType.bg) {
      ctx.fillStyle = pType.bg;
      ctx.fillRect(0, 0, width, height);
    }
    tab1Cy = upbox.height / 4;

    //空白K线图表格
    ctx.rect(upbox.x, upbox.y, upbox.width, upbox.height);
    //空白均量图表格
    // small 代表是否要小型K线图， 默认值为true
    if (!pType.small) {
      ctx.rect(downbox.x, downbox.y, downbox.width, downbox.height);
    }

    if (pType.useFundDaily && sType === '日') {
      ctx.rect(fundBox.x, fundBox.y, fundBox.width, fundBox.height);
    }

    ctx.strokeStyle = pType.grey;
    ctx.stroke();

    //K线图三条横线
    for (z = 1; z < 4; z += 1) {
      drawDashedLine(upbox.x, upbox.y + tab1Cy * z, upbox.x + upbox.width, upbox.y + tab1Cy * z, pType.grey, 0.2);
    }

    //K线图三条坚线
    for (y = 1; y < 4; y += 1) {
      drawDashedLine(upbox.x + timeSplieWidth * y, upbox.y, upbox.x + timeSplieWidth * y, upbox.y + upbox.height, pType.grey, 0.2);
    }

    //均量图一条中线
    if (pType.down.middle) {
      drawDashedLine(downbox.x, downbox.y + downbox.height / 2, downbox.x + downbox.width, downbox.y + downbox.height / 2, pType.grey, 0.2);
    }

    // 均量图三条竖线
    // small 代表是否要小型K线图， 默认值为true
    if (!pType.small) {
      for (i = 1; i < 4; i += 1) {
        drawDashedLine(downbox.x + timeSplieWidth * i, downbox.y, downbox.x + timeSplieWidth * i, downbox.y + downbox.height, pType.grey, 0.2);
      }
    }
    upf9 = fontSize.upf9;
    if (pType.up.useBoldFont) {
      bold = 'bold ';
    }
    ctx.font = bold + upf9 + pType.up.font9;
    ctx.textAlign = 'right';

    marginTop *= scale;
    marginTop *= pixRatio;
    maxWidth *= scale;
    maxWidth *= pixRatio;

    maxWidth = 4 + leftWidth;

    // 前端刻度x左偏集体放大2
    if (typeof window === 'object') {
      maxWidth -= 2;
    }

    //画刻度
    if (pType.up.userRed) {
      redForScale = pType.up.red;
      more = 3;
    }
    drawString(scalePrices[4], upbox.x - maxWidth, upbox.y + marginTop + more, redForScale);
    drawString(scalePrices[3], upbox.x - maxWidth, upbox.y + marginTop + tab1Cy, redForScale);
    drawString(scalePrices[2], upbox.x - maxWidth, upbox.y + marginTop + tab1Cy * 2, redForScale);
    drawString(scalePrices[1], upbox.x - maxWidth, upbox.y + marginTop + tab1Cy * 3, redForScale);
    drawString(scalePrices[0], upbox.x - maxWidth, upbox.y + marginTop + tab1Cy * 4, redForScale);

    //画面交量刻度
    if (pType.down.middle) {
      nVolum = parseInt(nVolum / 2, 10);
      yTop = downbox.height / 2 - 2;
    }

    sVolum = nVolum;
    if (nVolum >= 10000000) {
      sVolum = parseFloat((nVolum / 100000000.0).toFixed(1)).toString() + '亿';
    } else if (nVolum >= 10000) {
      sVolum = Math.round(nVolum / 10000).toString() + '万';
    }
    if (pType.down.useChinese) {
      ctx.font = bold + upf9 + pType.down.fontCH;
    }
    // 前端svlumn刻度Y向上提3
    if (typeof window === 'object') {
      yTop = yTop - 3;
    }
    // small 代表是否要小型K线图， 默认值为true
    if (!pType.small) {
      drawString(sVolum, upbox.x - maxWidth, downbox.y + yTop + 8, pType.down.grey);
    }

    // 画资金流向图0刻度
    if (pType.useFundDaily && sType === '日') {
      drawString('0', fundBox.x - maxWidth, fundBox.y + fundBox.height, pType.down.grey);
    }

    ctx.textAlign = 'left';

    //画面版上部信息，股票名称，股票代码
    topVariable *= scale;
    topVariable *= pixRatio;
    if (!pType.top.showType) {
      textOffSetX = upbox.x;
      stockName = kline.stockInfo.dataValue[2];
      stockID = "[" + kline.stockInfo.dataValue[0] + "]";
      ctx.font = fontSize.topf12 + pType.top.font12;

      drawString(stockName, textOffSetX, canvasY - topVariable, pType.top.black);
      textOffSetX += ctx.measureText(stockName).width;

      if (pType.bottom.showType === 2) {
        stockID = kline.stockInfo.dataValue[0];
        ctx.font = fontSize.topf12 + pType.top.font12;
      } else {
        ctx.font = fontSize.topf10 + pType.top.font10;
      }
      drawString(stockID, textOffSetX, canvasY - topVariable, pType.top.black);
      ctx.font = fontSize.topf12 + pType.top.font12;
      desc = sType + "K";
      if (pType.bottom.showType === 2) {
        if (data.length > 0) {
          desc = data[data.length - 1][0];
          desc = desc.substring(0, 4) + "/" + desc.substring(4, 6) + "/" + desc.substring(6, 8);
        } else {
          d = new Date();
          desc = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
        }
        textOffSetX = ctx.measureText(desc).width + 2;
        drawString(desc, upbox.width + upbox.x - textOffSetX, canvasY - topVariable, pType.top.black);
        desc = "30日";
        textOffSetX += ctx.measureText(desc).width + 5;
        drawString(desc, upbox.width + upbox.x - textOffSetX, canvasY - topVariable, pType.up.pink);
        desc = "10日";
        textOffSetX += ctx.measureText(desc).width + 5;
        drawString(desc, upbox.width + upbox.x - textOffSetX, canvasY - topVariable, pType.up.blue);
        desc = "5日";
        textOffSetX += ctx.measureText(desc).width + 5;
        drawString(desc, upbox.width + upbox.x - textOffSetX, canvasY - topVariable, pType.up.black);
      } else {
        textOffSetX = ctx.measureText(desc).width + 2;
        drawString(desc, upbox.width + upbox.x - textOffSetX, canvasY - topVariable, pType.top.black);
      }
    } // end draw top info

    //画面板中部信息
    if (pType.middle) {
      if (pType.middle.useBoldFont) {
        boldMiddle = 'bold ';
      }
      fontSize.midf9 += scale;
      ctx.font = boldMiddle + fontSize.midf9 + pType.middle.font9;
      time = "";
      if (data.length > 0) {
        time = data[0][0];
        if (time === null) {
          time = "";
        }
        kLength = time.length;
        if (kLength > 6) {
          if (kType >= 7) { //分钟K线
            time = time.substring(kLength - 8, kLength - 6) + "-" + time.substring(kLength - 6, kLength - 4) + " " + time.substring(kLength - 4, kLength - 2) + ":" + time.substring(kLength - 2);
          } else {
            time = time.substring(kLength - 6, kLength - 4) + "-" + time.substring(kLength - 4, kLength - 2) + "-" + time.substring(kLength - 2);
          }
        }
        middleVariable *= scale;
        middleVariable *= pixRatio;

        middleLeftY = upbox.y + upbox.height + spacePass - middleVariable + spaceHeight;
        if (pType.middle.drawMiddle) {
          middleLeftY = upbox.y + upbox.height + spacePass / 2 + middleVariable + spaceHeight * 3;
        }
        if (pType.small) {
          middleLeftY -= fontSize.upf9 / 2;
        }
        drawString(time, upbox.x, middleLeftY, pType.middle.lowerBlue);

        time = data[data.length - 1][0];
        if (time === null) {
          time = "";
        }
        kLength = time.length;
        if (kLength > 6) {
          if (kType >= 7) { //分钟K线
            time = time.substring(kLength - 8, kLength - 6) + "-" + time.substring(kLength - 6, kLength - 4) + " " + time.substring(kLength - 4, kLength - 2) + ":" + time.substring(kLength - 2);
          } else {
            time = time.substring(kLength - 6, kLength - 4) + "-" + time.substring(kLength - 4, kLength - 2) + "-" + time.substring(kLength - 2);
          }
        }
      } else {
        date = new Date();
        time = (date.getMonth() > 8 ? "" : "0") + (date.getMonth() + 1) + "-" + (date.getDate() > 9 ? "" : "0") + date.getDate();
      }
      middleRightY = upbox.y + upbox.height + spacePass - middleVariable + spaceHeight;
      if (pType.middle.drawMiddle) {
        middleRightY = upbox.y + upbox.height + spacePass / 2 + middleVariable + spaceHeight * 3;
      }
      if (pType.small) {
        middleRightY -= fontSize.upf9 / 2;
      }
      drawString(time, upbox.x + upbox.width - ctx.measureText(time).width, middleRightY, pType.middle.lowerBlue);
    } // end draw middle info

    //画面板底部信息
    if (pType.bottom.showType === 1) {
      if (dataPrice.length > 5) {
        if (pType.bottom.useBoldFont) {
          boldBottom = 'bold ';
        }
        fontSize.btmf10 += scale;
        ctx.font = boldBottom + fontSize.btmf10 + pType.bottom.font10;
        descWidth = ctx.measureText(demo_desc).width;
        descHeight = pType.bottom.font10Size;
        bottomVariable *= scale;
        bottomVariable *= pixRatio;

        belowYPosition = downbox.y + downbox.height + spaceButtom - bottomVariable + spaceHeight;
        belowMa5XPosition = downbox.x;
        belowMa10XPosition = downbox.x + parseInt(downbox.width - descWidth, 10) / 2;
        belowMa30XPosition = parseInt(downbox.x + downbox.width - descWidth, 10);
        // 将MA画在右上角, 并将底部downbox下拉
        if (pType.drawTagTopRight) {
          maUpboxLen *= scale;
          maUpboxLen *= pixRatio;
          maBetweenLen *= scale;
          maBetweenLen *= pixRatio;
          belowYPosition = upbox.y + maUpboxLen + descHeight;
          if ((wtype === 'webAppBig' || wtype === 'webAppSmall') && (typeof window !== 'object')) {
            // 在server端画出的，和在客户端画出的，效果不太一样，到上边框的距离不同，所以分开处理
            belowYPosition = upbox.y + maUpboxLen + descHeight + 12;
          }
          belowMa5XPosition = upbox.x + upbox.width - maUpboxLen - 3 * descWidth - 2 * maBetweenLen;
          belowMa10XPosition = upbox.x + upbox.width - maUpboxLen - 2 * descWidth - maBetweenLen - 8;
          belowMa30XPosition = upbox.x + upbox.width - maUpboxLen - descWidth - 3;
        }
        drawString("MA5", belowMa5XPosition, belowYPosition, pType.bottom.black);
        if (dataPrice.length > 10) {
          drawString('MA10', belowMa10XPosition, belowYPosition, pType.bottom.blue);
          if (dataPrice.length >= 30) {
            drawString('MA30', belowMa30XPosition, belowYPosition, pType.bottom.pink);
          }
        }
      }
    } // end draw bottom info
  }// end function drawBaseFrame

  function getPriceX(counter) {
    return upbox.x + parseFloat((candleWidth + spaceWidth) * counter);
  }// end function getPriceX

  function getPriceY(price) {
    var difPrice = scalePrices[scalePrices.length - 1] - scalePrices[0];
    if (difPrice === 0) {
      return parseFloat(upbox.y + upbox.height);
    }
    return parseFloat(upbox.y + upbox.height - (price - scalePrices[0]) / difPrice * upbox.height);
  }// end function getPriceY

  function getFundDailyVolumnX(counter) {
    return upbox.x + parseFloat((candleWidth + spaceWidth) * counter);
  }// end function getFundDailyVolumnX

  function getFundDailyVolumnY(volumnFundDaily) {
    var difPrice = maxFundDailyVolum;
    if (difPrice === 0) {
      return 0.001;
    }
    return parseFloat(Math.abs(volumnFundDaily) / difPrice * fundBox.height * 0.9);
  }// end function getFundDailyVolumnY

  function getVolumnY(volumn) {
    if (maxVolumn === 0) {
      return parseFloat(downbox.y + downbox.height);
    }
    return parseFloat(downbox.y + downbox.height - volumn / maxVolumn * downbox.height * 0.9);
  }// end function getVolumnY

  function fillRect(x, y, w, h, color) {
    ctx.beginPath();
    if (!color) {
      color = '#b4c5de';
    }
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  }// end function fillRect

  function rect(x, y, w, h, color) {
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    if (!color) {
      color = '#b4c5de';
    }
    ctx.strokeStyle = color;
    ctx.rect(x, y, w, h);
    ctx.stroke();
  }// end function rect

  function drawLines(xPoints, yPoints, color) {
    var i;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    for (i = 0; i < xPoints.length - 1; i += 1) {
      ctx.moveTo(xPoints[i], yPoints[i]);
      ctx.lineTo(xPoints[i + 1], yPoints[i + 1]);
    }
    ctx.strokeStyle = color;
    ctx.stroke();
  }// end function drawLines

  function drawKLine() {
    var counter = 0,
      data = kline.kLine.dataValue,
      size = data.length,
      timeSize = 0,
      demoWidth = ctx.measureText("00/00").width + 4,
      i,
      openPrice,
      highPrice,
      lowPrice,
      closePrice,
      volumn,
      isFall = false,
      drawColor,
      xPosition,
      candleX,
      openLineY,
      lowLineY,
      closeLineY,
      highLineY,
      candleHigh,
      upY,
      downY,
      volumnY,
      timeStr,
      demoTimeWidth;

    if (pType.bottom.showType === 2) {
      ctx.font = fontSize.btmf10 + pType.bottom.font10;
      timeSize = downbox.width / demoWidth;
      if (timeSize > 4) {
        timeSize = 4;
      }
      timeSize = size / timeSize;
      if (timeSize < 10) {
        timeSize = 10;
      }
    }
    for (i = 0; i < size; i += 1) {
      openPrice = data[i][2];
      highPrice = data[i][1];
      lowPrice = data[i][3];
      closePrice = data[i][4];
      volumn = data[i][5];
      drawColor = pType.up.red;

      //如果是跌
      if (openPrice > closePrice) {
        isFall = true;
        drawColor = pType.up.green;
      }

      xPosition = getPriceX(counter) + candleWidth;
      candleX = xPosition - candleWidth / 2;
      openLineY = getPriceY(openPrice);
      lowLineY = getPriceY(lowPrice);
      closeLineY = getPriceY(closePrice);
      highLineY = getPriceY(highPrice);

      //画中间
      if (isFall) {
        upY = openLineY;
        downY = closeLineY;
        candleHigh = closeLineY - openLineY;

        //平盘 十字星
        if (candleHigh === 0) {
          candleHigh = 1;
        }
        fillRect(candleX, upY, candleWidth, candleHigh, drawColor);
      } else {
        upY = closeLineY;
        downY = openLineY;
        candleHigh = openLineY - closeLineY;

        //平盘 十字星
        if (candleHigh === 0) {
          candleHigh = 1;
        }
        fillRect(candleX, upY, candleWidth, candleHigh, drawColor);
      }
      // 画上线
      drawLine(xPosition, upY, xPosition, highLineY, drawColor);

      // 画下线
      drawLine(xPosition, downY, xPosition, lowLineY, drawColor);

      // 画成交量
      // small 代表是否要小型K线图， 默认值为true
      if (!pType.small) {
        volumnY = getVolumnY(volumn);
        if (isFall) {
          fillRect(candleX, volumnY, candleWidth, downbox.y + downbox.height - volumnY, drawColor);
        } else {
          fillRect(candleX, volumnY, candleWidth, downbox.y + downbox.height - volumnY, drawColor);
        }
      }
      //画时间坐标值
      if (pType.bottom.showType === 2) {
        if (0 === counter % timeSize || (size - 1) === counter) {
          if (data[i][0] !== null && data[i][0].length >= 8) {
            timeStr = data[i][0].substring(4, 8);
            timeStr = timeStr.substring(0, 2) + "/" + timeStr.substring(2, 4);
            demoTimeWidth = ctx.measureText(timeStr).width + 4;
            if (0 === counter) {
              demoTimeWidth = downbox.x;
            } else if (size - 1 === counter) {
              demoTimeWidth = downbox.x + downbox.width - demoTimeWidth;
            } else {
              demoTimeWidth  = candleX - demoTimeWidth / 2;
            }
            //画面版下部信息 
            drawString(timeStr, demoTimeWidth, downbox.y + downbox.height + spaceButtom - 3, pType.up.white);
          }
        }
      }
      counter += 1;
    }
  }// end function drawKLine

  function drawFundDailyLine() {
    var counter = 0,
      data = kline.kLine.dataValue,
      i,
      dailyFundVolumn,
      drawColor,
      xPosition,
      dailyFundVolumnX,
      dailyFundVolumnYLength;
    for (i = 0; i < data.length; i += 1) {
      dailyFundVolumn = data[i][9];

      // 如果日资金流动量为正，用红色； 若为负，则用绿色表示
      drawColor = pType.bottom.red;
      if (dailyFundVolumn < 0) {
        drawColor = pType.bottom.green;
      }

      xPosition = getFundDailyVolumnX(counter) + candleWidth;
      dailyFundVolumnX = xPosition - candleWidth / 2;

      dailyFundVolumnYLength = getFundDailyVolumnY(dailyFundVolumn);

      fillRect(dailyFundVolumnX, fundBox.y + fundBox.height - dailyFundVolumnYLength, candleWidth, dailyFundVolumnYLength, drawColor);
      counter += 1;
    }
  }// end function drawFundDailyLine

  function getAvgPoint(nFlag, avgData, xPoints, yPoints) {
    var width = ((nFlag === 0) ? upbox.width : downbox.width),
      startX = ((nFlag === 0) ? upbox.x : downbox.x) + candleWidth / 2,
      startY = ((nFlag === 0) ? upbox.y : downbox.y),
      height = ((nFlag === 0) ? upbox.height : downbox.height),
      i;
    for (i = 0; i < avgData.length; i += 1) {
      xPoints[i] = i * (candleWidth + spaceWidth) + startX;
      yPoints[i] = startY + height;
      if (avgData[i] > 0) {
        yPoints[i] -= (((nFlag === 0) ? (avgData[i] - scalePrices[0]) / (scalePrices[scalePrices.length - 1] - scalePrices[0]) : avgData[i] / maxVolumn) * height);
      } else {
        yPoints[i] = 0;
      }
    }
  }// end function getAvgPoint

  function drawAvgLineByNum(nFlag, data, num, color) {
    var avgData,
      xPoints,
      yPoints,
      i;
    if (color) {
      // avgData是平均数据的数组
      avgData = calData2(nFlag, num, maxShowNum);
      xPoints = [];
      xPoints.length = avgData.length;
      yPoints = [];
      yPoints.length = avgData.length;
      getAvgPoint(nFlag, avgData, xPoints, yPoints);
      for (i = 1; i < xPoints.length; i += 1) {
        if (yPoints[i - 1] > 0) {
          drawLine(xPoints[i - 1], yPoints[i - 1], xPoints[i], yPoints[i], color);
        }
      }
    }
  }// end function drawAvgLineByNum

  function drawAvgLine(nFlag) {
    var isDraw = false,
      data = ((nFlag === 0) ? dataPrice : dataVolum),
      i;

    for (i = 0; i < data.length; i += 1) {
      if (data[i] > 0) {
        isDraw = true;
      }
    }
    if (isDraw) {
      drawAvgLineByNum(nFlag, data, 5, pType[nFlag === 0 ? "up" : "down"].black);
      drawAvgLineByNum(nFlag, data, 10, pType[nFlag === 0 ? "up" : "down"].blue);
      drawAvgLineByNum(nFlag, data, 30, pType[nFlag === 0 ? "up" : "down"].pink);
    }
  }// end function drawAvgLine

  /**
  * 初始化图片区域参数
  */
  function initGraphicsContext() {
    var demoHeight,
      upScale,
      i,
      bold = '',
      upf9,
      wh,
      idealHeight = 0,
      demoMaxV;

    initImage();
    canvas.x = parseInt(canvasX, 10) + 0.5;
    if (!pType.top.showType) {
      canvas.y = parseInt(canvasY, 10) + 0.5 + spaceHeight;
    } else {
      canvas.y = parseInt(canvasY, 10) + 0.5;
    }
    canvas.width = width - canvasX - 2;
    canvas.height = height - canvas.y - spaceButtom - spaceHeight;

    demoHeight = canvas.height - spacePass - spaceHeight * 2;
    if (pType.useFundDaily && sType === '日') {
      demoHeight = canvas.height - 2 * spacePass - spaceHeight * 4;
    }
    upScale = pType.upScale || 0.7;
    if (pType.useFundDaily && sType !== '日') {
      upScale = 0.7525;
    }
    //走势框
    upbox.x = canvas.x;
    upbox.y = canvas.y;
    upbox.width = canvas.width;
    upbox.height = parseInt(demoHeight * upScale, 10);
    if (pType.small) {
      upbox.height = parseInt(demoHeight * upScale, 10) + spacePass + spaceHeight * 2 + spaceButtom * 1.1;
    }

    //成交量框
    downbox.x = canvas.x;
    downbox.y = canvas.y + upbox.height + spacePass + spaceHeight * 2;
    downbox.width = canvas.width;
    downbox.height = parseInt(demoHeight * (1 - upScale), 10) + 1;
    // 只有webAppBig的图片才会显示资金流向
    if (pType.useFundDaily && sType === '日') {
      downbox.height = parseInt(demoHeight * ((1 - upScale) / 2), 10) + 1;
    }

    // 日资金流量走势框
    if (pType.useFundDaily && sType === '日') {
      idealHeight = parseInt((2 * downbox.height + 2 * spaceHeight + spacePass) / 2, 10);
      downbox.height = idealHeight;
      fundBox.x = canvas.x;
      fundBox.y = downbox.y + downbox.height + 4 * spaceHeight;
      fundBox.width = canvas.width;
      fundBox.height = idealHeight;
    }

    //最大显示个数
    if (kSize <= 0) {
      maxShowNum = parseInt((upbox.width - candleWidth) / (candleWidth + spaceWidth), 10);
    } else {
      // maxShowNum = kSize; 
      maxShowNum = kSize;
      if (kSize < 20) {
        kSize = 20;
      }
      candleWidth = parseFloat(((upbox.width - spaceWidth * kSize) / (kSize + 1)).toFixed(3));
    }

    //缓存价格和成交量为计算30日均线做准备
    dataPrice = [];
    dataPrice.length = kline.kLine.dataValue.length;
    dataVolum = [];
    dataVolum.length = kline.kLine.dataValue.length;

    for (i = 0; i < dataPrice.length; i += 1) {
      dataPrice[i] = kline.kLine.dataValue[i][4];
      dataVolum[i] = kline.kLine.dataValue[i][5];
    }
    //清除掉超过图片显示的最大个数的数据
    // if (kline.kLine.dataValue.length > maxShowNum) {
    //   kline.kLine.dataValue = kline.kLine.dataValue.slice(kline.kLine.dataValue.length - maxShowNum, kline.kLine.dataValue.length);
    // }
    calculate();
    upf9 = fontSize.upf9;
    if (pType.up.useBoldFont) {
      bold = 'bold ';
    }
    ctx.font = bold + upf9 + pType.up.font9;
    wh =  ctx.measureText(scalePrices[4]).width + 6 + leftWidth;
    canvasX = wh;
    demoMaxV = maxVolumn;
    if (maxVolumn >= 10000000) {
      demoMaxV = parseFloat((maxVolumn / 100000000.0).toFixed(1)).toString() + '亿';
    } else if (maxVolumn >= 10000) {
      demoMaxV = Math.round(maxVolumn / 10000).toString() + '万';
    }

    if (pType.up.useBoldFont) {
      ctx.font = bold + upf9 + pType.down.fontCH;
    }
    wh = ctx.measureText(demoMaxV).width + 6 + leftWidth;
    if (wh > canvasX) {
      canvasX = wh;
    }
    // 此处是为了根据最大价格和成交量刻度的长度来动态的改变box的宽度以及启示横坐标
    canvas.x = parseInt(canvasX, 10) + 0.5;
    canvas.width = width - canvasX - 2;
    upbox.width = canvas.width;
    upbox.x = canvas.x;
    downbox.x = canvas.x;
    downbox.width = canvas.width;
    if (pType.useFundDaily && sType === '日') {
      fundBox.x = canvas.x;
      fundBox.width = canvas.width;
    }
    kSize = maxShowNum;
    if (kSize < 20) {
      kSize = 20;
    }
    candleWidth = parseFloat((upbox.width  / (kSize + 1)).toFixed(3));
    if (candleWidth <= spaceWidth) {
      spaceWidth = parseInt(candleWidth / 2, 10);
    }
    candleWidth = candleWidth - spaceWidth;

  }// end function initGraphicsContext

  // initGraphicsContext();

  this.draw = function () {
    //计算当前数据
    //calculate();
    initGraphicsContext();
    //画主面版
    drawBaseFrame();

    if (kline.kLine.dataValue.length > 0) {

      //画K线图
      drawKLine();

      //画日资金流向图
      // if (pType.useFundDaily && fundDailyData && fundDailyData.dataValue[0][2].length > 0) {
      // 只有webApp需求的日K才绘制资金流向图，其余类型不绘制
      if (pType.useFundDaily && sType === '日') {
        drawFundDailyLine();
      }

      //画K线均线
      drawAvgLine(0);

      //画成交量均线
      if (!pType.down.noline) {
        drawAvgLine(1);
      }

    }

    ctx.restore();
  };

}; // end function KLineView

var createKLineView = function (wtype, ctx, width, height, data, kSize, fontSize, picType, scale, drawVolAvgLineFlag, pixRatio) {
  'use strict';
  return new KLineView(wtype, ctx, width, height, data, kSize, fontSize, picType, scale, drawVolAvgLineFlag, pixRatio);
};

if (typeof exports === 'object') {
  exports.createKLineView = createKLineView;
}

/**
 * 供前端调用绘制K线图
 * @param Object canvas      画图对象
 * @param String wtype    产品类型，web，wap，mms，lenovo
 * @param Object data    K线JOSN格式数据
 * @param Integer kSize   K线大小
 * @param Object fundDailyData   日资金流向数据
 * @param Integer ktype   K线类型
 * @param Integer scale 图片缩放的倍数
 * @param Boolean drawVolAvgLineFlag 是否画成交量均线
 */
function startDrawKline(canvas, wtype, data, kSize, ktype, scale, drawVolAvgLineFlag) {
  'use strict';
  var pixRatio,
    fontSizeKline,
    ctx,
    line,
    picSettings;

  wtype = wtype || 'web';
  scale = scale || 1;

  pixRatio = window.devicePixelRatio;
  if (!pixRatio) {
    pixRatio = 1;
  }
  fontSizeKline = {};

  function initFontSize(fontSizeKline, wtype, cb) {
    var specificKlineType = picType[wtype].kline;
    // 设置字体参数
    fontSizeKline.spaceHeight = specificKlineType.spaceHeight || 1;
    fontSizeKline.spaceWidth = specificKlineType.spaceWidth || 2;
    fontSizeKline.dashed = specificKlineType.dashed || 1;
    fontSizeKline.lineWidth = specificKlineType.lineWidth || 1;
    fontSizeKline.leftWidth = specificKlineType.leftWidth || 1;
    fontSizeKline.topf12 = (specificKlineType.top ? specificKlineType.top.font12Size : 12) || 12;
    fontSizeKline.topf11 = (specificKlineType.top ? specificKlineType.top.font10Size : 10) || 10;
    fontSizeKline.upf12 = (specificKlineType.up ? specificKlineType.up.font9Size : 9) || 9;
    fontSizeKline.midf9 = (specificKlineType.middle ? specificKlineType.middle.font9Size : 9) || 9;
    fontSizeKline.btmf9 = (specificKlineType.bottom ? specificKlineType.bottom.font10Size : 10) || 10;
    fontSizeKline.canvasx = specificKlineType.canvasX || 37; // 价格及成交量区域起始X坐标
    fontSizeKline.canvasy = specificKlineType.canvasY || 20;// 价格及成交量区域起始Y坐标
    cb(fontSizeKline);
  }
  // 设置默认值， 与后端调用的默认值相同
  initFontSize(fontSizeKline, wtype, function (fontSizeKline) {
    ctx = canvas.getContext('2d');
    ctx.antialias = 'subpixel';
    ctx.patternQuality = 'fast';
    picSettings = picType;
    line = createKLineView(wtype, ctx, canvas.width, canvas.height, data, kSize, fontSizeKline, picSettings, scale, drawVolAvgLineFlag, pixRatio);
    line.setKType(ktype);
    line.draw();
  });
} // end function startDrawKline
