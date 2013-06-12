
/**
 * 分时走势模块
 * @param String wtype    产品类型，web，wap，mms，lenovo
 * @param Object ctx      画图对象
 * @param Integer width   图片宽度
 * @param Integer height  图片高度
 * @param Object mline    分时JSON格式数据
 * @param Object fundDailyDataMline    日资金流向数据
 * @param Object fontSize 字体集合
 * @param Object picType  图片配置文件
 * @param Integer scale 图片缩放的倍数
 * @param Integer pixRatio 显示器像素比， 前端调用动态的传入， 后端此值横为1
 */
var MLineView = function (wtype, ctx, width, height, mline, fontSize, picType, scale, pixRatio) {
  'use strict';
  // 放大图片
  // 将图形的宽和高都扩大scale倍
  width *= scale;
  height *= scale;
  // Predifine the variable and function names
  var pType = picType[wtype],
    maxShowPoint = 240,
    headType = 0,
    SCALE_SIZE = 5,
    maxVolumn = 0,
    minVolumn = 999999999,
    maxPrice = 0,
    minPrice = 999999999,
    maxFundDailyVolumn = 0, // 最大资金流入/出的绝对值
    scalePercentPrices = [], // 百分比价格刻度
    scalePrices = [],// 价格刻度
    upbox = {}, //上框价格区属性集合
    downbox = {}, //下框成交量属性结合
    canvas = {}, // 图片区域属性集合
    canvasX = fontSize.canvasx, // 价格及成交量区域起始X坐标
    canvasY = fontSize.canvasy, // 价格及成交量区域起始Y坐标
    spaceButtom = pType.spaceButtom || 15, // 底部显示文字区域的高度
    space_width = 5 * scale, // 相邻点之间的间隔
    spacePass,
    scaleStrWidth = 0,
    spaceWidth,//空白宽度  
    lineWidth, //线条的宽度
    spaceHeight, // 空白高度， 即：顶部信息与upbox的距离， 或者中部信息与上下边框的距离
    dashed, // 虚线的间隔
    leftWidth;
  if (pType && pType.mline) {
    pType = pType.mline;
  } else {
    pType = picType.web.mline;
  }

  if (pType.scaleStrWidth) {
    scaleStrWidth = pType.scaleStrWidth;
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
  // fontSize.topf11 = fontSize.topf11;
  // fontSize.upf12 = fontSize.upf12;
  // fontSize.midf9 = fontSize.midf9;
  // fontSize.btmf9 = fontSize.btmf9;

  // 前端调用不使用后端缩放， scale恒为1， 但是对于高分屏要按像素比放大
  // 后端调用使用后端缩放， scale默认为2， pixRatio不存在恒为1
  fontSize.topf12 *= pixRatio;
  fontSize.topf11 *= pixRatio;
  fontSize.upf12 *= pixRatio;
  fontSize.midf9 *= pixRatio;
  fontSize.btmf9 *= pixRatio;

  fontSize.topf12 *= scale;
  fontSize.topf11 *= scale;
  fontSize.upf12 *= scale;
  fontSize.midf9 *= scale;
  fontSize.btmf9 *= scale;

  scalePercentPrices.length = SCALE_SIZE;
  scalePrices.length = SCALE_SIZE;
  spacePass = pType.spacePass || 13; // 中部空白的高度
  spaceWidth = fontSize.spaceWidth || 2;//空白宽度
  lineWidth = fontSize.lineWidth || 1; //线条的宽度
  spaceHeight = fontSize.spaceHeight || 0; //留下空白的高度
  dashed = fontSize.dashed || 1; // 虚线的间隔
  leftWidth = fontSize.leftWidth || 0;

  canvasX *= scale;
  canvasY *= scale;
  spaceButtom *= scale;
  spacePass *= scale;
  scaleStrWidth *= scale;
  spacePass *= pixRatio;
  canvasX *= pixRatio;
  canvasY *= pixRatio;
  spaceButtom *= pixRatio;
  scaleStrWidth *= pixRatio;
  if (mline.stockInfo.dataValue[3] === "HK") {
    maxShowPoint = 330;
  }

  this.setHeadType = function (hType) {
    headType = hType === 0 ? 0 : 1;
  };

  /**
   * 计算准备数据
   */
  function calculate() {
    var preVolumn = 0,
      mUnit = mline.mUnit.dataValue,
      maxShowPrice = 0,
      minShowPrice = 0,
      closePrice = 0,
      difPrice = 0,
      i,
      j,
      k,
      price,
      volumn,
      amount,
      halfCount = parseInt(SCALE_SIZE / 2, 10), // 分割线数量
      fundDailyAmount,
      fundData;
    // 计算最大最小成交价与成交量
    // 计算最大日资金流入/出绝对值的值
    if (mUnit.length > 0) {
      if (mUnit.length > 0 && mUnit[0][1]) {
        for (j = 0; j < mUnit.length; j += 1) {
          price = mUnit[j][1];
          volumn = mUnit[j][2];
          amount = mUnit[j][3];
          fundDailyAmount = mUnit[j][4];
          if (volumn === 0 && price > 0) {
            mUnit[j][3] = amount / price;
          }
          volumn = volumn - preVolumn;
          if (price > maxPrice) {
            maxPrice = price;
          }
          if (price < minPrice) {
            minPrice = price;
          }
          if (Math.abs(fundDailyAmount) > maxFundDailyVolumn) {
            maxFundDailyVolumn = Math.abs(fundDailyAmount);
          }

          if (volumn > maxVolumn) {
            maxVolumn = volumn;
          }
          if (volumn < minVolumn) {
            minVolumn = volumn;
          }
          preVolumn = mUnit[j][2];
        }
        if (maxPrice === minPrice) {
          maxPrice = maxPrice + 0.01;
          minPrice = minPrice - 0.01;
        }
        if (pType.isTrendPic) {
          maxShowPrice = maxPrice + maxPrice * 0.007;
          minShowPrice = minPrice - minPrice * 0.007;
        } else {
          maxShowPrice = maxPrice + maxPrice * 0.002;
          minShowPrice = minPrice - minPrice * 0.002;
        }
      } else {
        maxVolumn = 0;
        minPrice = 0;
      }
      //由收盘价算出与最大/最小价的最大差值
      closePrice = parseFloat(mline.closePrice) || 0;
      if (pType.isTrendPic) {
        closePrice = parseFloat((maxShowPrice + minShowPrice) / 2) || 0;
      }
      difPrice = Math.abs(maxShowPrice - closePrice);
      if (Math.abs(minShowPrice - closePrice) > difPrice) {
        difPrice = Math.abs(minShowPrice - closePrice);
      }
    }

    //计算刻度值
    for (i = 0; i < SCALE_SIZE; i += 1) {
      scalePercentPrices[i] = 0;
      if (halfCount > i) {
        scalePrices[i] = closePrice - difPrice * (halfCount - i) / (halfCount);
        if (closePrice !== 0) {
          scalePercentPrices[i] = (closePrice - scalePrices[i]) / closePrice * 100;
        }
      } else if (halfCount === i) {
        scalePrices[i] = closePrice;
      } else {
        scalePrices[i] = closePrice + difPrice * (i - halfCount) / (halfCount);
        if (closePrice !== 0) {
          scalePercentPrices[i] = (scalePrices[i] - closePrice) / closePrice * 100;
        }
      }
      if (mline.stockInfo.dataValue[6] === 'Y') {
        scalePrices[i] = parseInt(scalePrices[i], 10);
      } else {
        if (scalePrices[i] < 2) {
          scalePrices[i] = scalePrices[i].toFixed(3);
        } else {
          scalePrices[i] = scalePrices[i].toFixed(2);
        }
      }
    }

  }// end function calculate

  function initImage() {
    var demo_stockName = "A",
      demo_price = scalePrices[4],
      demo_midTime = "9",
      demo_btm = "M",
      font = ctx.font, // 保存当前的字体，初始化后恢复
      wh = 0,
      bold = '',
      demo_maxV;
    ctx.font = fontSize.topf11 + pType.top.font11;
    // headType 代表m图片上方是显示股票名称和代号（headType=0），还是显示涨跌百分比（headType=1)
    // 如果用户传来的headType不等于1， 或者配置文件中headType是false，则设置12号字体
    // 以下条件等价于 (headType !== 1) || (!pType.headType)
    if (!(headType === 1 && pType.headType)) {
      if (fontSize.topf11 < fontSize.topf12) {
        ctx.font = fontSize.topf12 + pType.top.font12;
      }
    }
    // showType 代表是否显示图片顶部信息
    if (!pType.top.showType) {
      // if (ctx.measureText(demo_stockName).emHeightAscent) {
      //   wh = ctx.measureText(demo_stockName).emHeightAscent + 2;
      // } else {
      wh = fontSize.topf12;
      // }
      if (canvasY < wh) {
        canvasY = wh;
      }
    }
    // 需要用加粗的字体， 比如wap-app需求的图片
    if (pType.up.useBoldFont) {
      bold = "bold ";
    }
    ctx.font = bold + fontSize.upf12 + pType.up.font12;
    wh = ctx.measureText(demo_price).width + 5 + leftWidth;
    if (canvasX < wh) {
      canvasX = wh;
    }
    demo_maxV = maxVolumn;
    if (maxVolumn >= 10000000) {
      demo_maxV = parseFloat((maxVolumn / 100000000.0).toFixed(1)).toString() + '亿';
    } else if (maxVolumn >= 10000) {
      demo_maxV = Math.round(maxVolumn / 10000).toString() + '万';
    }
    ctx.font = bold + fontSize.upf12 + pType.down.font12;
    wh = ctx.measureText(demo_maxV).width + 5 + leftWidth;
    if (canvasX < wh) {
      canvasX = wh;
    }
    if (pType.up.scalePercent) {
      wh =  ctx.measureText("0.0%").width + 8 + leftWidth;
      if (scaleStrWidth < wh) {
        scaleStrWidth = wh;
      }
    }
    // 确保图片底部信息绘制在spaceButtom范围内, 字体高度
    ctx.font = bold + fontSize.btmf9 + pType.bottom.font9;
    // if (ctx.measureText(demo_btm).emHeightAscent) {
    //   wh = ctx.measureText(demo_btm).emHeightAscent;
    // } else {
    wh = fontSize.btmf9;
    // }
    if (spaceButtom < wh) {
      spaceButtom = wh;
    }
    // pType.middle代表配置文件中是否需要绘制出M图中部时间信息
    if (pType.middle) {
      // 保证中部信息绘制在spacePass范围内
      ctx.font = fontSize.midf9 + pType.middle.font9;
      // if (ctx.measureText(demo_midTime).emHeightAscent) {
      //   wh = ctx.measureText(demo_midTime).emHeightAscent;
      // } else {
      wh = fontSize.midf9;
      // }
      if (spacePass < wh) {
        spacePass = wh;
      }
    }
    // 恢复之前的字体, 不想让刚才的设置判断覆盖原先的字体
    ctx.font = font;
  }// end function initImage

  function initGraphicsContext() {
    var demo_height,
      upScale = pType.upScale || 0.7;
    initImage();
    if (pType.isTrendPic) {
      canvasX = 2 * pixRatio * scale;
      canvasY = 2 * pixRatio * scale;
      spaceButtom = 2 * pixRatio * scale;
    }
    // 偏移0.5画的更清晰
    canvas.x = parseInt(canvasX, 10) + 0.5;
    if (!pType.top.showType) {
      canvas.y = parseInt(canvasY, 10) + 0.5 + spaceHeight;
    } else {
      canvas.y = parseInt(canvasY, 10) + 0.5;
    }
    canvas.width = width - canvas.x - scaleStrWidth;
    canvas.height = height - canvas.y - spaceButtom;

    demo_height = canvas.height - spacePass - spaceHeight * 2;
    // 走势框
    upbox.x = canvas.x;
    upbox.y = canvas.y;
    upbox.width = canvas.width + 0.5;
    upbox.height = parseInt(demo_height * upScale, 10);
    if (pType.small) {
      upbox.height = parseInt(demo_height * upScale, 10) + spacePass + spaceHeight * 2 + spaceButtom + 0.5;
    }
    if (pType.isTrendPic) {
      upbox.height = canvas.height - spaceButtom + 0.5;
    }

    // 成交量框
    downbox.x = canvas.x;
    downbox.y = canvas.y + upbox.height + spacePass + spaceHeight * 2;
    downbox.width = canvas.width + 0.5;
    downbox.height = parseInt(demo_height * (1 - upScale), 10);
  } // end function initGraphicsContext

  function drawLine(x, y, w, h, color, lw) {
    x = parseInt(x, 10) + 0.5;
    y = parseInt(y, 10) + 0.5;
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

  function drawTrendLine(x, y, w, h, color, lw) {
    x = parseInt(x, 10) + 0.5;
    y = parseInt(y, 10) + 0.5;
    ctx.beginPath();
    lw = lineWidth - (lw || 0);
    if (!color) {
      color = pType.defaultColor;
    }
    ctx.lineWidth = lw;
    ctx.lineWidth += 1;
    ctx.moveTo(x, y);
    ctx.lineTo(w, h);
    ctx.strokeStyle = color;
    ctx.stroke();
  }// end function drawTrendLine

  function drawDashedLine(x, y, w, h, color, lw) {
    var i,
      per_Left,
      per_Top,
      k,
      rectWidth = 1,
      rectHeight = 1;

    ctx.beginPath();
    lw = lineWidth - (lw || 0);
    if (!color) {
      color = pType.defaultColor;
    }
    ctx.lineWidth = lw;
    if (pType.middle.drawMiddle) {
      ctx.lineWidth = pType.lineWidth;
      if (typeof window === 'object') {
        ctx.lineWidth = pType.lineWidth / 2 * pixRatio;
      }
    }
    i = parseInt((h - y) / 3, 10);
    if (i === 0) {
      i = parseInt((w - x) / 3, 10);
    }
    per_Left = parseFloat((w - x) / i);
    per_Top = parseFloat((h - y) / i);
    for (k = 0; k < i; k += dashed) {
      ctx.rect(x + k * per_Left, y + k * per_Top, rectWidth, rectHeight);
    }
    ctx.strokeStyle = color;
    ctx.stroke();
  }// end function drawDashedLine

  function drawString(text, x, y, color) {
    if (color) {
      ctx.fillStyle = color;
    }
    ctx.fillText(text, x, y);
  }// end function drawString

  /**
   * 此方法目的是获取最近的分时时间，兼容就版本的数据源
   * 修改：2011-9-5日并且支持港股时间，之前的BUG不支持港股时间，导致时间显示错误
   * @return
   */
  function getCurrentTimeStr(xType) {
    var addMinuts = 0,
      nAfter = 121,
      date = new Date();
    if (mline.stockInfo.dataValue[3] === "HK") {
      nAfter = 151;
    }
    if (mline.mUnit.dataValue.length <= nAfter) {
      date.setHours(9);
      addMinuts = mline.mUnit.dataValue.length + 30;
    } else {
      date.setHours(13);
      addMinuts = mline.mUnit.dataValue.length - nAfter;
    }
    date.setMinutes(addMinuts);
    return (date.getHours() > 9 ? '' : '0') + date.getHours() + ":" + (date.getMinutes() > 9 ? '' : '0') + date.getMinutes() + (xType ? "" : ":00");
  }// end function getCurrentTimeStr

  function drawBaseFrame() {
    var tab1_cy,
      frame_dotted,
      frame_middle,
      frame,
      z,
      k,
      m,
      timeSplieWidth,
      bold = '',
      marginTop = 4,
      maxWidth,
      firstTop = 0,
      marginLeft,
      nVolum = maxVolumn,
      yTop = 0,
      maxHeight = 0,
      sVolum,
      grey = pType.down.grey,
      textOffSetX,
      data = mline.mUnit.dataValue,
      desc,
      upDown,
      stockName,
      stockID,
      time,
      d,
      boldMiddle = '',
      timeMiddle,
      middleY,
      boldBottom = '',
      dateStr = ["09:30", " ", "11:30/13:00", " ", "15:00"],
      i,
      offsetX,
      topScaleVariable = 2,
      topVariable = 3,
      middleVariable = 3,
      volumnVariable = 7,
      bottomVaribale = 3,
      more = 0,
      xVariable = 0,
      bottomPositionY = 0,
      secondScale = 0,
      firstScale = 0,
      thirdScale = 0;

    //边框
    //ctx.linCap = 'butt';
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    if (pType.bg) {
      ctx.fillStyle = pType.bg;
      ctx.fillRect(0, 0, width, height);
    }
    tab1_cy = upbox.height / 4;

    //空白上表格
    if (pType.isTrendPic) {
      ctx.lineWidth = 1;
      ctx.strokeStyle = pType.up.boxColor;
    }
    ctx.rect(upbox.x, upbox.y, upbox.width, upbox.height); //+ space_width
    //空白下表格
    if (!pType.small) {
      ctx.rect(downbox.x, downbox.y, downbox.width, downbox.height);//+ space_width
    }

    ctx.strokeStyle = pType.frame;
    ctx.stroke();

    //三条横线
    frame_dotted = pType.frame_dotted;
    frame_middle = pType.frame_middle;
    frame = pType.frame;
    if (!pType.isTrendPic) {
      for (z = 1; z < 4; z += 1) {
        if (z === 2) {
          if (frame_middle) {
            frame = frame_middle;
          }
          drawLine(upbox.x, upbox.y + parseInt(tab1_cy * 2, 10), upbox.x + upbox.width, upbox.y + tab1_cy * 2, frame, 0.1);
        } else {
          if (frame_dotted) {
            frame = frame_dotted;
          }
          drawDashedLine(upbox.x, upbox.y + tab1_cy * z, upbox.x + upbox.width, upbox.y + tab1_cy * z, frame, 0.2);
        }
      }
    }

    // 三条坚线
    timeSplieWidth = upbox.width / 4;
    if (!pType.isTrendPic) {
      for (k = 1; k < 4; k += 1) {
        if (frame_dotted) {
          frame = frame_dotted;
        }
        drawDashedLine(upbox.x + timeSplieWidth * k, upbox.y, upbox.x  + timeSplieWidth * k, upbox.y + upbox.height, frame, 0.2);
      }
    }

    //均量图一条中线
    if (pType.down.middle) {
      drawDashedLine(downbox.x, downbox.y + downbox.height / 2, downbox.x + downbox.width, downbox.y + downbox.height / 2, pType.frame, 0.2);
    }

    //均量图三条竖线
    if (!pType.small) {
      for (m = 1; m < 4; m += 1) {
        if (frame_dotted) {
          frame = frame_dotted;
        }
        drawDashedLine(downbox.x  + timeSplieWidth * m, downbox.y, downbox.x + timeSplieWidth * m, downbox.y + downbox.height, frame, 0.2);
      }
    }

    if (pType.up.useBoldFont) {
      bold = 'bold ';
    }
    ctx.font = bold + fontSize.upf12 + pType.up.font12;
    ctx.textAlign = 'right';
    maxWidth = 2 + leftWidth;

    marginTop *= scale;
    marginTop *= pixRatio;
    maxWidth *= scale;
    maxWidth *= pixRatio;

    // 微调前端WAP-APP图片样式
    if ((wtype === 'webAppBig' || wtype === 'webAppSmall' || wtype === 'webAppMainPage') && (typeof window === 'object')) {
      more = 7;
      if (pixRatio !== 1) {
        more = 9;
        maxWidth -= 17;
        if (wtype === 'webAppSmall' && (typeof window === 'object')) {
          maxWidth += 4;
        }
        if (wtype === 'webAppMainPage' && (typeof window === 'object')) {
          maxWidth += 4;
        }
      }
    }

    // 微调后端WAP-APP图片样式
    if ((wtype === 'webAppBig' || wtype === 'webAppSmall' || wtype === 'webAppMainPage') && (typeof window !== 'object')) {
      xVariable = -17;
      firstScale = 2;
      secondScale = 2;
      more = 9;
      if (wtype === 'webAppSmall' && (typeof window !== 'object')) {
        xVariable = -10;
      }
      if (wtype === 'webAppMainPage' && (typeof window !== 'object')) {
        xVariable = -12;
        firstScale = 2;
      }
    }

    if (pType.topX > 10 || pType.top.showType) {
      if (ctx.measureText(scalePrices[4]).emHeightAscent) {
        topScaleVariable *= scale;
        topScaleVariable *= pixRatio;
        firstTop = ctx.measureText(scalePrices[4]).emHeightAscent - topScaleVariable;
      } else {
        firstTop = fontSize.upf12;
      }
    }

    // 画刻度
    if (!pType.isTrendPic) {
      drawString(scalePrices[4], upbox.x - maxWidth - xVariable - firstScale, upbox.y + marginTop + firstTop / 2 - more, pType.up.red);
      drawString(scalePrices[3], upbox.x - maxWidth - xVariable - secondScale, upbox.y + marginTop + tab1_cy, pType.up.red);
      drawString(scalePrices[2], upbox.x - maxWidth - xVariable, upbox.y + marginTop + tab1_cy * 2, pType.up.black);
      drawString(scalePrices[1], upbox.x - maxWidth - xVariable, upbox.y + marginTop + tab1_cy * 3, pType.up.lowerBlue);
      drawString(scalePrices[0], upbox.x - maxWidth - xVariable, upbox.y + marginTop + tab1_cy * 4, pType.up.lowerBlue);
    }

    if (pType.useFundDaily) {
      ctx.textAlign = 'left';
      drawString('0', upbox.x + upbox.width + 4, upbox.y + marginTop + tab1_cy * 2, pType.up.black);
    }

    if (pType.up.scalePercent) {
      ctx.textAlign = 'left';
      marginLeft = 8 + leftWidth;
      marginTop += 8;
      // 画百分数
      drawString(scalePercentPrices[0].toFixed(1) + "%", upbox.x + upbox.width + marginLeft, upbox.y + marginTop, pType.up.red);
      drawString(scalePercentPrices[1].toFixed(1) + "%", upbox.x + upbox.width + marginLeft, upbox.y + marginTop + tab1_cy, pType.up.red);
      drawString(scalePercentPrices[2].toFixed(1) + "%", upbox.x + upbox.width + marginLeft, upbox.y + marginTop + tab1_cy * 2, pType.up.black);
      drawString(scalePercentPrices[3].toFixed(1) + "%", upbox.x + upbox.width + marginLeft, upbox.y + marginTop + tab1_cy * 3, pType.up.lowerBlue);
      drawString(scalePercentPrices[4].toFixed(1) + "%", upbox.x + upbox.width + marginLeft, upbox.y + marginTop + tab1_cy * 4, pType.up.lowerBlue);
    }

    // 画成交量刻度
    if (pType.down.middle) {
      nVolum = parseInt(nVolum / 2, 10);
      yTop = downbox.height / 2;
    }
    sVolum = nVolum;
    if (pType.down.volumScale) {
      if (nVolum >= 10000000) {
        sVolum = parseFloat((nVolum / 100000000.0).toFixed(1)).toString() + '亿';
      } else if (nVolum >= 10000) {
        sVolum = Math.round(nVolum / 10000).toString() + '万';
      }
    }
    if (ctx.measureText(sVolum).emHeightAscent) {
      maxHeight = ctx.measureText(sVolum).emHeightAscent;
    } else {
      maxHeight = fontSize.upf12;
    }
    if (pType.down.middle) {
      maxHeight = maxHeight / 2;
    }
    ctx.textAlign = 'right';
    if (pType.down.red) {
      grey = pType.down.red;
    }
    ctx.font = bold + fontSize.upf12 + pType.down.font12;
    volumnVariable *= scale;
    volumnVariable *= pixRatio;
    if (!pType.small) {
      drawString(sVolum, upbox.x - maxWidth - xVariable, downbox.y + yTop + maxHeight - volumnVariable, grey);
    }

    ctx.textAlign = 'left';
    //画面版上部信息，股票名称，股票代码或者涨跌
    textOffSetX = upbox.x - pType.topX;
    topVariable *= scale;
    topVariable *= pixRatio;
    if (!pType.top.showType) {
      if (headType === 1 && pType.headType) {
        if (data.length > 0) {
          if (data[data.length - 1] && data[data.length - 1][1] && typeof (data[data.length - 1][1]) === 'number' && !isNaN(data[data.length - 1][1])) {
            upDown = data[data.length - 1][1] - mline.closePrice;
            desc = data[data.length - 1][1].toFixed(2);
            desc += " " + upDown.toFixed(2);
            if (upDown > 0) {
              desc += "↑";
            } else if (upDown < 0) {
              desc += "↓";
            }
            desc += " ";
            upDown = upDown / mline.closePrice * 100;
            if (upDown > 0) {
              desc += "+";
            }
            desc += upDown.toFixed(2) + "%";
            ctx.font = fontSize.topf11 + pType.top.font11;
            textOffSetX = (upbox.width + upbox.x  - ctx.measureText(desc).width - topVariable - 1); //+ space_width
            if (upDown === 0) {
              drawString(desc, textOffSetX, canvasY - topVariable, pType.top.black);
            } else if (upDown > 0) {
              drawString(desc, textOffSetX, canvasY - topVariable, pType.top.red);
            } else {
              drawString(desc, textOffSetX, canvasY - topVariable, pType.top.green);
            }
          }
        }
      } else {
        ctx.font = fontSize.topf12 + pType.top.font12;
        stockName = mline.stockInfo.dataValue[2];
        stockID = "[" + mline.stockInfo.dataValue[0] + "]";
        drawString(stockName, textOffSetX, canvasY  - topVariable, pType.top.black);
        textOffSetX = ctx.measureText(stockName).width + 2 + upbox.x - pType.topX;
        if (pType.top.mini) {
          stockID = mline.stockInfo.dataValue[0];
          drawString(stockID, textOffSetX, canvasY - topVariable, pType.top.black);
          time = mline.date;
          if (time) {
            desc = time;
            desc = desc.substring(4, 6) + "/" + desc.substring(6, 8);
          } else {
            d = new Date();
            desc = (d.getMonth() + 1) + "/" + d.getDate();
          }
          desc += " " + getCurrentTimeStr("xx");
          textOffSetX = ctx.measureText(desc).width + 2;
          drawString(desc, upbox.width + upbox.x - textOffSetX + pType.scaleStrWidth, canvasY - topVariable, pType.top.black);
          desc = "-均价";
          textOffSetX += ctx.measureText(desc).width + 2;
          drawString(desc, upbox.width + upbox.x - textOffSetX + pType.scaleStrWidth, canvasY - topVariable, pType.up.avgPrice);
          desc = "-价格";
          textOffSetX += ctx.measureText(desc).width + 2;
          drawString(desc, upbox.width + upbox.x - textOffSetX + pType.scaleStrWidth, canvasY - topVariable, pType.up.priceColor);
        } else {
          ctx.font = fontSize.topf11 + pType.top.font11;
          drawString(stockID, textOffSetX, canvasY - topVariable, pType.top.black);
        }
      }
    }
    //画面板中部日期
    if (!pType.small) {
      middleVariable *= scale;
      middleVariable *= pixRatio;

      if (data.length > 0 && pType.middle) {
        if (pType.middle.useBoldFont) {
          boldMiddle = 'bold ';
        }
        fontSize.midf9 += scale;
        ctx.font = boldMiddle + fontSize.midf9 + pType.middle.font9;
        timeMiddle = mline.date;
        if (timeMiddle) {
          timeMiddle = timeMiddle.substring(0, 4) + "-" + timeMiddle.substring(4, 6) + "-" + timeMiddle.substring(6) + " " + getCurrentTimeStr();
          middleY = upbox.y + upbox.height + spacePass - middleVariable + spaceHeight;
          if (pType.middle.drawMiddle) {
            middleY = upbox.y + upbox.height + spacePass / 2 + middleVariable + spaceHeight * 3;
          }
          drawString(timeMiddle, upbox.width + upbox.x  - ctx.measureText(timeMiddle).width, middleY, pType.middle.lowerBlue); //+ space_width
        }
      }
    }

    //画面版下部信息
    if (pType.bottom.useBoldFont) {
      boldBottom = 'bold ';
    }
    fontSize.btmf9 += scale;
    if (wtype === 'webAppMainPage' && (typeof window === 'object')) {
      fontSize.btmf9 += 1;
    }
    ctx.font = boldBottom + fontSize.btmf9 + pType.bottom.font9;
    if (mline.stockInfo.dataValue[3] === "HK") {
      dateStr[2] = "12:00/13:00";
      dateStr[4] = "16:00";
    }
    bottomVaribale *= scale;
    bottomVaribale *= pixRatio;
    for (i = 0; i < dateStr.length; i += 1) {
      offsetX = upbox.x + timeSplieWidth * i;
      if (i === 0) {
        thirdScale = 1;
      } else if (i === dateStr.length - 1) {
        offsetX = parseInt(upbox.width + upbox.x - ctx.measureText(dateStr[i]).width, 10);
      } else {
        offsetX = parseInt(offsetX - ctx.measureText(dateStr[i]).width / 2, 10);
      }
      if (pType.small) {
        if (!pType.isTrendPic) {
          drawString(dateStr[i], offsetX, upbox.y + upbox.height + spaceButtom, pType.middle.lowerBlue);
        }
      } else {
        bottomPositionY = downbox.y + downbox.height + spaceButtom - bottomVaribale;
        if (wtype === 'webAppBig') {
          bottomPositionY += bottomVaribale;
        }
        drawString(dateStr[i], offsetX, bottomPositionY, pType.bottom.lowerBlue);
      }
    }
  }// end function drawBaseFrame

  /**
	 * 画线
	 */
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

  /**
   * 画趋势图的填充颜色部分(分解成无数的线条，设置线条的颜色即可)
   */
  function drawTrendColor(webAppTrendDiameter, yPoints) {
    var startX = upbox.x,
      startY = upbox.y,
      width = upbox.width,
      endY = startY + upbox.height,
      counter = 0,
      xPoint,
      data = mline.mUnit.dataValue,
      // 最高点Y轴坐标(最高点的Y轴坐标最小)
      minPositionY = 99999,
      minPositionX = 0,
      // 最低点Y轴坐标(最低点的Y轴坐标最大)
      maxPositionY = 0,
      maxPositionX = 0,
      i,
      diameter;

    if (pType.isTrendPic) {
      startX = upbox.x + webAppTrendDiameter;
      startY = upbox.y + webAppTrendDiameter;
      width = upbox.width - 2 * webAppTrendDiameter;
    }

    for (i = 0; i < data.length; i += 1) {
      xPoint = parseInt(counter / maxShowPoint * width, 10) + startX;
      drawTrendLine(xPoint - 1, endY, xPoint - 1, yPoints[i], pType.up.blue);
      if (yPoints[i] < minPositionY) {
        minPositionY = yPoints[i];
        minPositionX = i;
      }
      if (yPoints[i] > maxPositionY) {
        maxPositionY = yPoints[i];
        maxPositionX = i;
      }
      counter += 1;
    }

    // 对于趋势图，如果图形是一条平行于X轴的线段， 那么就不绘制圆圈， 有两种情况：
    // 1. 停牌股票
    // 2. 跳空涨停，跌停， 然后价格一直没有变化的股票
    if ((maxPrice - 0.01) !== (minPrice + 0.01)) {
      // 获取对应的X坐标值
      minPositionX = parseInt(minPositionX / maxShowPoint * width, 10) + startX;
      maxPositionX = parseInt(maxPositionX / maxShowPoint * width, 10) + startX;

      // 在最大值点与最小值点画圆圈
      ctx.beginPath();
      ctx.lineWidth = 2 * pixRatio * scale;
      ctx.strokeStyle = '#3ecafd';
      diameter = 5 * scale * pixRatio;
      // 画价格线最高值点的圆圈(纵坐标最小)
      ctx.arc(parseInt(minPositionX, 10) + 0.5, parseInt(minPositionY, 10), diameter, 0, (Math.PI / 180) * 360, false);
      ctx.stroke();
      ctx.closePath();

      // 画价格线最小值点的圆圈(纵坐标最大)
      ctx.beginPath();
      ctx.lineWidth = 2 * pixRatio * scale;
      ctx.strokeStyle = '#3ecafd';
      ctx.arc(parseInt(maxPositionX, 10) + 0.5, parseInt(maxPositionY, 10), diameter, 0, (Math.PI / 180) * 360, false);
      ctx.stroke();
      ctx.closePath();
    }
  } // end function drawTrendColor

  /**
	 * 画分时
	 */
  function drawPriceLine() {
    var  webAppTrendDiameter = 11 * pixRatio * scale,
      startX = upbox.x,
      startY = upbox.y,
      width = upbox.width,
      demo_height = upbox.height,
      counter = 0,
      size = mline.mUnit.dataValue.length,
      xPoints = [],
      yPoints = [],
      i,
      price;

    if (pType.isTrendPic) {
      startX = upbox.x + webAppTrendDiameter;
      startY = upbox.y + webAppTrendDiameter;
      width = upbox.width - 2 * webAppTrendDiameter;
      demo_height = upbox.height - 2 * webAppTrendDiameter;
    }

    xPoints.length = size;
    yPoints.length = size;
    for (i = 0; i < size; i += 1) {
      price = mline.mUnit.dataValue[i][1];
      xPoints[counter] = (counter / maxShowPoint * width) + startX;
      yPoints[counter] = startY + demo_height - ((price - scalePrices[0]) / (scalePrices[scalePrices.length - 1] - scalePrices[0]) * demo_height);
      counter += 1;
    }
    if (pType.isTrendPic) {
      drawTrendColor(webAppTrendDiameter, yPoints);
    }
    drawLines(xPoints, yPoints, pType.up.priceColor);
  }// end function drawPriceLine

  /**
	 * 画均线
	 * 计算公式：沪深 = 成交总额 / 成交总量
	 * 理论上港股的计算公式和沪深一样，在实际处理中有误，通过以下公式进行修正。
	 * 港股 = 每一分钟的成交额之和  / 成交总量
	 * 每一分钟计算方法：即 (当前分钟成交总量-上一分钟成交总量 ) * 当前价格
   * "time","price","volum","amount"
   * "093059",2.32,108,25132
	 */
  function drawAvgLine() {
    var data = mline.mUnit.dataValue,
      nSum = data[0][1] * data[0][2],
      avgData = [],
      i,
      xPoints = [],
      yPoints = [],
      width,
      startX,
      startY,
      demo_height;

    avgData.length = data.length;
    avgData[0] = data[0][1];
    if (mline.stockInfo.dataValue[3] === 'HK') {
      for (i = 1; i < avgData.length; i += 1) {
        if (data[i][2] > data[i - 1][2]) { //如果出现当前总成交量小于前一分钟的总成交量则扔掉
          nSum += (data[i][2] - data[i - 1][2]) * data[i][1];
          avgData[i] = nSum / data[i][2];
        } else {
          data[i][2] = data[i - 1][2];
          avgData[i] = avgData[i - 1];
        }
      }
    } else {
      for (i = 1; i < avgData.length; i += 1) {
        if (data[i][2] > data[i - 1][2]) { //如果出现当前总成交量小于前一分钟的总成交量则扔掉
          nSum += (data[i][2] - data[i - 1][2]) * data[i][1];
          if (data[i][3] === 0 || data[i][2] === 0) {
            if (nSum === 0 || data[i][2] === 0) {
              avgData[i] = avgData[i - 1];
            } else {
              avgData[i] = nSum / data[i][2];
            }
          } else {
            avgData[i] = data[i][3] / data[i][2] / 100;
          }
        } else {
          data[i][2] = data[i - 1][2];
          avgData[i] = avgData[i - 1];
        }
      }
    }
    xPoints.length = avgData.length;
    yPoints.length = avgData.length;
    width = upbox.width;
    startX = upbox.x;//+ parseInt(space_width / 2),
    startY = upbox.y;
    demo_height = upbox.height;
    for (i = 0; i < avgData.length; i += 1) {
      xPoints[i] = parseInt(i / maxShowPoint * width, 10) + startX;
      yPoints[i] = startY + demo_height - parseInt((avgData[i] - scalePrices[0]) / (scalePrices[scalePrices.length - 1] - scalePrices[0]) * demo_height, 10);
    }
    drawLines(xPoints, yPoints, pType.up.avgPrice);
  }// end function drawAvgLine

  /**
	 * 画成交量
	 */
  function drawVolumn() {
    var startX = downbox.x,
      startY = downbox.y,
      endY = startY + downbox.height,
      counter = 0,
      xPoint,
      yPoint,
      preVolumn = 0,
      data = mline.mUnit.dataValue,
      volumn,
      i;
    for (i = 0; i < data.length; i += 1) {
      volumn = data[i][2] - preVolumn;
      if (volumn <= 0) {
        counter += 1;
        // continue;
      } else {
        xPoint = parseInt(counter / maxShowPoint * downbox.width, 10) + startX;
        yPoint = parseInt(startY + downbox.height - volumn / maxVolumn * downbox.height, 10);
        preVolumn = data[i][2];
        drawLine(xPoint, endY, xPoint, yPoint, pType.down.grey);
        counter += 1;
      }
    }
  }// end function drawVolumn

  /**
   * 画资金流向图
   */
  function drawFundDailyLine() {
    var startX = upbox.x,
      startY = upbox.y,
      endY = startY + upbox.height / 2,
      counter = 0,
      xPoint,
      yPoint,
      data = mline.mUnit.dataValue,
      i;
    for (i = 0; i < data.length; i += 1) {
      xPoint = parseInt(counter / maxShowPoint * upbox.width, 10) + startX;
      if (maxFundDailyVolumn === 0) {
        yPoint = parseInt(startY + upbox.height / 2, 10);
      } else {
        yPoint = parseInt(startY + upbox.height / 2 - data[i][4] / maxFundDailyVolumn * (upbox.height / 4), 10);
      }
      drawLine(xPoint, endY, xPoint, yPoint, pType.down.grey);
      counter += 1;
    }
  }// end function drawFundDailyLine

  this.draw = function () {

    //计算当前数据
    calculate();

    //初始化并画背景
    initGraphicsContext();

    //画主面版
    drawBaseFrame();

    if (mline.mUnit.dataValue.length > 0) {

      if (pType.useFundDaily) {
        drawFundDailyLine();
      }

      //画分时线图
      drawPriceLine();

      if (mline.stockInfo.dataValue[6] !== 'Y') { //指数除外
        //画均线
        if (!pType.isTrendPic) {
          drawAvgLine();
        }
      }

      //画成交量
      if (!pType.small) {
        drawVolumn();
      }

    }
    ctx.restore();
  };
}; // end function MLineView

var createMLineView = function (wtype, ctx, width, height, data, fontSize, picType, scale, pixRatio) {
  'use strict';
  return new MLineView(wtype, ctx, width, height, data, fontSize, picType, scale, pixRatio);
};

if (typeof exports === 'object') {
  exports.createMLineView = createMLineView;
}

/**
 * 供前端调用绘制分时图
 * @param Object canvas   画图对象
 * @param String wtype    产品类型，web，wap，mms，lenovo
 * @param Object data    分时JSON格式数据
 * @param Object fundDailyDataMline    日资金流向数据
 * @param Integer mtype   显示头部名称或者百分比
 * @param Integer scale 图片缩放的倍数
 */
function startDrawMline(canvas, wtype, data, mtype, scale) {
  'use strict';
  var pixRatio,
    fontSizeMline,
    ctx,
    line,
    picSettings;

  wtype = wtype || 'web';
  mtype = mtype || 0;
  scale = scale || 1;

  pixRatio = window.devicePixelRatio;
  if (!pixRatio) {
    pixRatio = 1;
  }
  fontSizeMline = {};

  function initFontSize(fontSizeMline, wtype, cb) {
    var specificMlineType = picType[wtype].mline;
    // 设置默认值， 与后端调用的默认值相同
    fontSizeMline.spaceHeight = specificMlineType.spaceHeight || 1;
    fontSizeMline.spaceWidth = specificMlineType.spaceWidth || 2;
    fontSizeMline.dashed = specificMlineType.dashed || 1;
    fontSizeMline.lineWidth = specificMlineType.lineWidth || 1;
    fontSizeMline.leftWidth = specificMlineType.leftWidth || 1;
    fontSizeMline.topf12 = (specificMlineType.top ? specificMlineType.top.font12Size : 12) || 12;
    fontSizeMline.topf11 = (specificMlineType.top ? specificMlineType.top.font11Size : 11) || 11;
    fontSizeMline.upf12 = (specificMlineType.up ? specificMlineType.up.font12Size : 12) || 12;
    fontSizeMline.midf9 = (specificMlineType.middle ? specificMlineType.middle.font9Size : 9) || 9;
    fontSizeMline.btmf9 = (specificMlineType.bottom ? specificMlineType.bottom.font9Size : 9) || 9;
    fontSizeMline.canvasx = specificMlineType.canvasX || 37; // 价格及成交量区域起始X坐标
    fontSizeMline.canvasy = specificMlineType.canvasY || 20; // 价格及成交量区域起始Y坐标
    cb(fontSizeMline);
  }

  initFontSize(fontSizeMline, wtype, function (fontSizeMline) {
    ctx = canvas.getContext('2d');
    ctx.antialias = 'subpixel';
    ctx.patternQuality = 'fast';
    picSettings = picType;
    // 资金流向数据包含在M先数据中
    line = createMLineView(wtype, ctx, canvas.width, canvas.height, data, fontSizeMline, picSettings, scale, pixRatio);
    line.setHeadType(mtype);
    line.draw();
  });
} // end function startDrawMline

