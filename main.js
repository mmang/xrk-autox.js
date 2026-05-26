"ui";

(function () {
  'use strict';

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
  }
  function _assertThisInitialized(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function _callSuper(t, o, e) {
    return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
  }
  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _construct(t, e, r) {
    if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
    var o = [null];
    o.push.apply(o, e);
    var p = new (t.bind.apply(t, o))();
    return r && _setPrototypeOf(p, r.prototype), p;
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
      writable: false
    }), e;
  }
  function _createForOfIteratorHelper(r, e) {
    var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (!t) {
      if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
        t && (r = t);
        var n = 0,
          F = function () {};
        return {
          s: F,
          n: function () {
            return n >= r.length ? {
              done: true
            } : {
              done: false,
              value: r[n++]
            };
          },
          e: function (r) {
            throw r;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var o,
      a = true,
      u = false;
    return {
      s: function () {
        t = t.call(r);
      },
      n: function () {
        var r = t.next();
        return a = r.done, r;
      },
      e: function (r) {
        u = true, o = r;
      },
      f: function () {
        try {
          a || null == t.return || t.return();
        } finally {
          if (u) throw o;
        }
      }
    };
  }
  function _getPrototypeOf(t) {
    return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
      return t.__proto__ || Object.getPrototypeOf(t);
    }, _getPrototypeOf(t);
  }
  function _inherits(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
    t.prototype = Object.create(e && e.prototype, {
      constructor: {
        value: t,
        writable: true,
        configurable: true
      }
    }), Object.defineProperty(t, "prototype", {
      writable: false
    }), e && _setPrototypeOf(t, e);
  }
  function _isNativeFunction(t) {
    try {
      return -1 !== Function.toString.call(t).indexOf("[native code]");
    } catch (n) {
      return "function" == typeof t;
    }
  }
  function _isNativeReflectConstruct() {
    try {
      var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    } catch (t) {}
    return (_isNativeReflectConstruct = function () {
      return !!t;
    })();
  }
  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = true,
        o = false;
      try {
        if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = true, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _possibleConstructorReturn(t, e) {
    if (e && ("object" == typeof e || "function" == typeof e)) return e;
    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
    return _assertThisInitialized(t);
  }
  function _setPrototypeOf(t, e) {
    return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
      return t.__proto__ = e, t;
    }, _setPrototypeOf(t, e);
  }
  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r);
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (String )(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }
  function _wrapNativeSuper(t) {
    var r = "function" == typeof Map ? new Map() : void 0;
    return _wrapNativeSuper = function (t) {
      if (null === t || !_isNativeFunction(t)) return t;
      if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
      if (void 0 !== r) {
        if (r.has(t)) return r.get(t);
        r.set(t, Wrapper);
      }
      function Wrapper() {
        return _construct(t, arguments, _getPrototypeOf(this).constructor);
      }
      return Wrapper.prototype = Object.create(t.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      }), _setPrototypeOf(Wrapper, t);
    }, _wrapNativeSuper(t);
  }

  var LOG_DIR = files.join(files.getSdcardPath(), "AutoGameFlow", "logs");
  var LOG_FILE = files.join(LOG_DIR, "app.log");
  var MAX_FILE_SIZE = 512 * 1024;
  var TRIM_TARGET = 256 * 1024;
  var LogStorage = /*#__PURE__*/function () {
    function LogStorage() {
      _classCallCheck(this, LogStorage);
    }
    return _createClass(LogStorage, null, [{
      key: "appendLine",
      value: function appendLine(line) {
        try {
          files.ensureDir(LOG_FILE);
          files.append(LOG_FILE, line + "\n");
          LogStorage.checkRotation();
        } catch (e) {
          console.error("LogStorage.appendLine failed: " + e);
        }
      }
    }, {
      key: "readAll",
      value: function readAll() {
        try {
          if (!files.exists(LOG_FILE)) return "";
          return files.read(LOG_FILE);
        } catch (e) {
          console.error("LogStorage.readAll failed: " + e);
          return "";
        }
      }
    }, {
      key: "clear",
      value: function clear() {
        try {
          if (files.exists(LOG_FILE)) {
            files.remove(LOG_FILE);
          }
        } catch (e) {
          console.error("LogStorage.clear failed: " + e);
        }
      }
    }, {
      key: "getFilePath",
      value: function getFilePath() {
        return LOG_FILE;
      }
    }, {
      key: "checkRotation",
      value: function checkRotation() {
        try {
          if (!files.exists(LOG_FILE)) return;
          var content = files.read(LOG_FILE);
          if (content.length < MAX_FILE_SIZE) return;
          var lines = content.split("\n");
          var trimmed = "";
          var totalLen = 0;
          for (var i = lines.length - 1; i >= 0; i--) {
            var lineLen = lines[i].length + 1;
            if (totalLen + lineLen > TRIM_TARGET) break;
            trimmed = lines[i] + "\n" + trimmed;
            totalLen += lineLen;
          }
          files.write(LOG_FILE, trimmed);
        } catch (e) {
          console.error("LogStorage.checkRotation failed: " + e);
        }
      }
    }]);
  }();

  var LogLevel;
  (function (LogLevel) {
    LogLevel[LogLevel["VERBOSE"] = 0] = "VERBOSE";
    LogLevel[LogLevel["DEBUG"] = 1] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["WARN"] = 3] = "WARN";
    LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
    LogLevel[LogLevel["NONE"] = 5] = "NONE";
  })(LogLevel || (LogLevel = {}));
  var Logger = /*#__PURE__*/function () {
    function Logger() {
      _classCallCheck(this, Logger);
    }
    return _createClass(Logger, null, [{
      key: "setLevel",
      value: function setLevel(level) {
        Logger._level = level;
      }
    }, {
      key: "setTag",
      value: function setTag(tag) {
        Logger._tag = tag;
      }
    }, {
      key: "addListener",
      value: function addListener(listener) {
        Logger._listeners.push(listener);
      }
    }, {
      key: "removeListener",
      value: function removeListener(listener) {
        var idx = Logger._listeners.indexOf(listener);
        if (idx >= 0) Logger._listeners.splice(idx, 1);
      }
    }, {
      key: "verbose",
      value: function verbose(tag, message) {
        Logger._log(LogLevel.VERBOSE, tag, message);
      }
    }, {
      key: "debug",
      value: function debug(tag, message) {
        Logger._log(LogLevel.DEBUG, tag, message);
      }
    }, {
      key: "info",
      value: function info(tag, message) {
        Logger._log(LogLevel.INFO, tag, message);
      }
    }, {
      key: "warn",
      value: function warn(tag, message) {
        Logger._log(LogLevel.WARN, tag, message);
      }
    }, {
      key: "error",
      value: function error(tag, message) {
        Logger._log(LogLevel.ERROR, tag, message);
      }
    }, {
      key: "_log",
      value: function _log(level, tag, message) {
        if (level < Logger._level) return;
        var levelStr = ["V", "D", "I", "W", "E"][level] || "?";
        var now = new Date();
        var time = [now.getHours().toString().padStart(2, "0"), now.getMinutes().toString().padStart(2, "0"), now.getSeconds().toString().padStart(2, "0")].join(":");
        var formatted = "".concat(time, " ").concat(levelStr, "/").concat(tag, ": ").concat(message);
        switch (level) {
          case LogLevel.VERBOSE:
            console.verbose(formatted);
            break;
          case LogLevel.DEBUG:
            log(formatted);
            break;
          case LogLevel.INFO:
            console.info(formatted);
            break;
          case LogLevel.WARN:
            console.warn(formatted);
            break;
          case LogLevel.ERROR:
            console.error(formatted);
            break;
        }
        var _iterator = _createForOfIteratorHelper(Logger._listeners),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var listener = _step.value;
            listener(formatted, level);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        LogStorage.appendLine(formatted);
      }
    }]);
  }();
  Logger._level = LogLevel.INFO;
  Logger._tag = "App";
  Logger._listeners = [];

  var TAG$4 = "ScriptGuard";
  /**
   * 检测异常是否为脚本中断（用户手动停止或超时）
   *
   * AutoX.js 在脚本被停止时抛出 ScriptInterruptedException，
   * 如果代码 catch 了这个异常后继续执行，会导致脚本"运行结束"后仍在运行。
   *
   * @param e - 捕获的异常
   * @returns true 表示是脚本中断异常
   */
  function isScriptInterrupted(e) {
    return String(e).includes("ScriptInterruptedException");
  }
  /**
   * 检测异常是否为脚本中断，如果是则立即终止脚本
   *
   * 在所有 catch 块中调用此函数，防止脚本中断后代码继续执行。
   * 典型用法：
   *   try { ... } catch (e) {
   *       guardScriptInterrupt(e);
   *       // 其他错误处理
   *   }
   */
  function guardScriptInterrupt(e) {
    if (isScriptInterrupted(e)) {
      Logger.info(TAG$4, "脚本已中断，立即退出");
      exit();
    }
  }

  // ============================================================
  //  执行上下文
  // ============================================================
  /**
   * 创建执行上下文
   *
   * ICtx 在整个任务链中共享，用于在步骤之间传递状态：
   *   - cfg:    全局配置（由 UI 传入或默认值）
   *   - task.current:  当前正在执行的步骤名称
   *   - task.attempts: 每个步骤成功时消耗的重试次数记录
   *   - task.data:     步骤间共享数据（如剩余次数、购买结果等）
   *
   * @param overrides - 可选的部分覆盖字段，如传入自定义 cfg 或初始 data
   * @returns 初始化后的 ICtx 实例
   */
  function createContext() {
    var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return Object.assign({
      cfg: {},
      task: {
        current: null,
        attempts: {},
        data: {}
      }
    }, overrides);
  }
  // ============================================================
  //  引擎状态
  // ============================================================
  /** 引擎是否正在运行。同一时间只允许一个任务执行，防止并发冲突 */
  var engineActive = false;
  /** 暂停标志。为 true 时主循环挂起等待恢复，由 togglePause() 切换 */
  var pauseFlag = false;
  /**
   * 用户主动停止标志
   *
   * 由 stopEngine() 设置为 true，用于通知 runTaskChain 停止后续任务。
   * 与 engineActive 的区别：
   *   - engineActive 在每次 run() 结束时重置为 false
   *   - stopped 跨任务持久化，确保整个任务链都会停止
   *   - stopped 只在 runTaskChain() 开头统一重置
   */
  var stopped = false;
  /**
   * 停止引擎
   *
   * 重置 engineActive 和 pauseFlag 让 Task.run() 的 while 循环退出，
   * 设置 stopped = true 让 runTaskChain 的 for 循环也退出。
   * 用户点击"停止"按钮时调用。
   */
  function stopEngine() {
    engineActive = false;
    pauseFlag = false;
    stopped = true;
  }
  // ============================================================
  //  单任务执行
  // ============================================================
  /**
   * 运行单个任务
   *
   * Engine 的薄包装层，只负责：
   *   1. 并发防护（同一时间只允许一个任务）
   *   2. 初始化引擎状态
   *   3. 创建 IEngineControl 注入到 Task
   *   4. 委托 task.run() 执行步骤循环
   *   5. 重置引擎活跃状态
   *
   * 步骤循环、恢复策略、步骤跳转等逻辑由 BaseTask.run() 实现。
   *
   * @param task      - 任务定义
   * @param startStep - 可选的起始步骤 key，默认使用 task.firstStep
   * @param ctx       - 可选的执行上下文，不传则自动创建
   * @returns true 表示任务正常完成，false 表示异常退出
   */
  function run(task, startStep, ctx) {
    // 防止并发
    if (engineActive) {
      toast("已有任务运行");
      return false;
    }
    // 初始化引擎状态
    // 注意：不在此处重置 stopped，stopped 由 runTaskChain() 统一管理
    engineActive = true;
    pauseFlag = false;
    if (!ctx) ctx = createContext();
    // 创建引擎控制接口，注入到 Task
    // Task 通过 control 查询暂停/停止状态，委托弹窗处理
    var control = {
      isPaused: function isPaused() {
        return pauseFlag;
      },
      isActive: function isActive() {
        return engineActive;
      }
    };
    // 委托 Task 执行步骤循环
    var success = task.run(ctx, startStep, control);
    // 重置引擎活跃状态
    engineActive = false;
    return success;
  }
  /**
   * 按顺序执行任务链
   *
   * 用户在 UI 上勾选多个任务后，这些任务被组装成一条任务链依次执行。
   * 每个任务之间间隔 2 秒，确保前一个任务的资源释放完毕。
   *
   * 任务失败处理策略：
   *   - 用户主动停止（stopped = true）→ 不再执行任何后续任务
   *   - 任务执行失败（run 返回 false）→ 调用 task.recoverFromStep() 恢复游戏状态后继续下一个
   *
   * @param taskList - 任务链配置列表
   * @param ctx      - 可选的共享执行上下文，所有任务共用同一份状态
   */
  function runTaskChain(taskList, ctx) {
    if (!ctx) ctx = createContext();
    // 统一重置停止标志
    // 放在此处而非 run() 中，确保用户主动停止后整个链都会中断
    stopped = false;
    log("开始执行任务链", taskList.map(function (item) {
      return item.task.name;
    }).join(", "));
    var _iterator = _createForOfIteratorHelper(taskList),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var item = _step.value;
        var task = item.task;
        var runs = item.runs || 1;
        var startStep = item.startStep;
        for (var i = 0; i < runs; i++) {
          // 用户主动停止 → 跳出所有循环
          if (stopped) break;
          log("===== \u5F00\u59CB\u4EFB\u52A1: ".concat(task.name, " \u7B2C ").concat(i + 1, "/").concat(runs, " \u6B21 ====="));
          var success = run(task, startStep, ctx);
          if (success) {
            log("===== \u4EFB\u52A1 ".concat(task.name, " \u5B8C\u6210 ====="));
          } else {
            log("===== \u4EFB\u52A1 ".concat(task.name, " \u5931\u8D25 ====="));
            // 非用户主动停止的情况下，尝试恢复游戏状态以继续后续任务
            if (!stopped) {
              try {
                log("尝试恢复游戏状态以继续后续任务...");
                var recovered = task.recoverFromStep(ctx, null);
                if (recovered) {
                  log("游戏状态已恢复，继续执行下一个任务");
                } else {
                  // 恢复失败仍继续，因为下一个任务的 run() 内部也有恢复机制
                  toastLog("无法恢复游戏状态，后续任务可能受影响");
                }
              } catch (e) {
                guardScriptInterrupt(e);
              }
            }
          }
          // 用户主动停止 → 跳出所有循环
          if (stopped) break;
          // 任务间间隔，给游戏页面切换留出时间
          sleep(2000);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    log("所有任务链执行完毕");
  }

  /******************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
  /* global Reflect, Promise, SuppressedError, Symbol, Iterator */


  function __rest(s, e) {
      var t = {};
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
          t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
              if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                  t[p[i]] = s[p[i]];
          }
      return t;
  }

  typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
      var e = new Error(message);
      return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
  };

  var STEP_END = "END";
  /**
   * 步骤状态未确认异常
   *
   * 当 action 执行后 confirmCondition 在轮询次数内仍未满足时抛出
   */
  var StateNotReachedError = /*#__PURE__*/function (_Error) {
    function StateNotReachedError(stepName, desc) {
      var _this;
      _classCallCheck(this, StateNotReachedError);
      _this = _callSuper(this, StateNotReachedError, ["\u6B65\u9AA4 ".concat(stepName, " \u672A\u80FD\u786E\u8BA4: ").concat(desc)]);
      _this.name = "StateNotReachedError";
      return _this;
    }
    _inherits(StateNotReachedError, _Error);
    return _createClass(StateNotReachedError);
  }(/*#__PURE__*/_wrapNativeSuper(Error));
  /**
   * 步骤抽象基类
   *
   * 每个步骤代表游戏流程中的一个原子操作（如点击按钮、等待页面加载等）。
   * 子类必须实现 name、action，可选覆盖 confirmCondition、preCheck 等钩子。
   *
   * 执行流程（与流程图对齐）：
   *   1. canSkip → 满足则跳过，走 nextStep
   *   2. preCheck 轮询 → 不满足走 onPreCheckFailed
   *   3. action（步骤核心操作）
   *   4. confirmCondition 轮询 → 不满足走 onConfirmFailed
   *   5. 满足 → nextStep
   */
  var Step = /*#__PURE__*/function () {
    function Step() {
      _classCallCheck(this, Step);
      /**
       * 当前任务引用，由引擎在执行前自动设置
       *
       * 子类可通过 this.taskRef 访问 goHome 等任务级方法，
       * 无需通过 action/confirmCondition 的参数传递。
       */
      this.taskRef = null;
      /** 前置条件轮询间隔（毫秒），默认 500ms */
      this.preCheckInterval = 500;
      /** 前置条件轮询次数，默认 6 次（6×500ms=3s） */
      this.preCheckAttempts = 6;
      /** 确认条件轮询间隔（毫秒），默认 500ms */
      this.confirmInterval = 500;
      /** 确认条件轮询次数，默认 6 次（6×500ms=3s） */
      this.confirmAttempts = 6;
    }
    /**
     * 日志标签，优先使用任务名称，fallback 到步骤名称
     */
    return _createClass(Step, [{
      key: "tag",
      get: function get() {
        var _a;
        return ((_a = this.taskRef) === null || _a === void 0 ? void 0 : _a.name) || this.name;
      }
      /**
       * 返回一个判断当前状态是否已达到预期的函数
       *
       * 引擎会在 action 执行后轮询此函数，直到返回 true 或超过轮询次数。
       * 例如：OCR 识别到目标文字、多点找色命中、控件出现等。
       *
       * 默认返回 () => true，子类可复写实现具体确认逻辑。
       */
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
      /**
       * 前置条件检查（可选）
       *
       * 在 action 执行前调用。返回一个判断函数，引擎会在 action 之前轮询此条件。
       * 不满足时走 onPreCheckFailed 回调，不会执行无效的 action。
       *
       * 适用场景：确认按钮已加载再点击、确认页面已切换再操作、避免过渡动画期间盲点。
       *
       * 默认返回 () => true（不启用前置检查，行为与当前一致）。
       */
    }, {
      key: "preCheck",
      value: function preCheck() {
        return function () {
          return true;
        };
      }
      /**
       * 前置条件检查失败后的处理（可选覆写）
       *
       * 默认：返回 undefined（抛出 StateNotReachedError，由上层恢复策略处理）
       * 返回步骤名：跳转到指定步骤
       * 返回 STEP_END：终止任务
       */
    }, {
      key: "onPreCheckFailed",
      value: function onPreCheckFailed(ctx, task) {
        return undefined;
      }
      /**
       * 确认条件检查失败后的处理（可选覆写）
       *
       * 默认：返回 undefined（抛出 StateNotReachedError，由上层恢复策略处理）
       * 返回步骤名：跳转到指定步骤
       * 返回 STEP_END：终止任务
       */
    }, {
      key: "onConfirmFailed",
      value: function onConfirmFailed(ctx, task) {
        return undefined;
      }
      /**
       * 步骤成功后跳转到下一步
       *
       * 返回 steps 映射表中的 key，STEP_END 表示任务结束。
       * 默认返回 STEP_END。
       */
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return STEP_END;
      }
      /**
       * 前置条件检查
       *
       * 在 action 执行前调用，返回 true 则跳过本步骤，直接走 nextStep。
       * 可用于条件性步骤，如"如果剩余次数 > 0 才执行"。
       */
    }, {
      key: "canSkip",
      value: function canSkip(ctx, task) {
        return false;
      }
      /** 任务暂停时的回调，可用于释放资源或记录状态 */
    }, {
      key: "onPause",
      value: function onPause(ctx, task) {}
      /** 任务恢复时的回调，可用于重新初始化 */
    }, {
      key: "onResume",
      value: function onResume(ctx, task) {}
      /**
       * 异常恢复策略
       *
       * 当步骤执行失败且引擎需要恢复时调用。
       * 默认策略：委托 task.goHome()。
       * 子类可覆盖此方法实现自定义恢复逻辑。
       *
       * @returns true 表示已恢复到可继续状态，false 表示恢复失败
       */
    }, {
      key: "recover",
      value: function recover(ctx, task) {
        return task.goHome();
      }
      /**
       * 步骤的完整执行流程（由引擎调用，一般不需要手动调用）
       *
       * 流程（与流程图对齐）：
       *   1. canSkip → 满足则跳过
       *   2. preCheck 轮询 → 不满足走 onPreCheckFailed
       *   3. action
       *   4. confirmCondition 轮询 → 不满足走 onConfirmFailed
       *   5. 满足 → nextStep
       */
    }, {
      key: "execute",
      value: function execute(ctx, task) {
        ctx.task.current = this.name;
        this.taskRef = task;
        log("\u2192 \u6267\u884C\u6B65\u9AA4: ".concat(this.name));
        // 是否能跳过本步骤
        if (this.canSkip(ctx, task)) {
          log("\u26A0 \u8DF3\u8FC7\u6B65\u9AA4 ".concat(this.name));
          return this.nextStep(ctx);
        }
        // 1. 检查运行条件（preCheck 轮询）
        var preCond = this.preCheck();
        if (preCond) {
          var preOk = this.pollCondition(preCond, this.preCheckInterval, this.preCheckAttempts);
          if (!preOk) {
            var _result = this.onPreCheckFailed(ctx, task);
            if (_result !== undefined) {
              log("\u26A0 ".concat(this.name, " \u524D\u7F6E\u68C0\u67E5\u5931\u8D25: ").concat(_result === STEP_END ? "终止" : "\u8DF3\u8F6C ".concat(_result)));
              return _result;
            }
            throw new StateNotReachedError(this.name, "前置条件未满足");
          }
        }
        // 2. 执行操作
        this.action(ctx, task);
        // 3. 确认结果（confirmCondition 轮询）
        var cond = this.confirmCondition();
        var ok = this.pollCondition(cond, this.confirmInterval, this.confirmAttempts);
        if (ok) {
          var next = this.nextStep(ctx);
          log("\u2713 ".concat(this.name, " \u6210\u529F\uFF0C\u524D\u5F80: ").concat(next));
          return next;
        }
        // 4. 确认失败
        var result = this.onConfirmFailed(ctx, task);
        if (result !== undefined) {
          log("\u26A0 ".concat(this.name, " \u786E\u8BA4\u5931\u8D25: ").concat(result === STEP_END ? "终止" : "\u8DF3\u8F6C ".concat(result)));
          return result;
        }
        throw new StateNotReachedError(this.name, "确认条件未满足");
      }
      /**
       * 轮询条件函数
       *
       * 在指定次数内，按间隔轮询条件函数，任一次返回 true 即视为成功。
       *
       * @param condition - 条件判断函数
       * @param interval  - 轮询间隔（毫秒）
       * @param attempts  - 最大轮询次数
       * @returns true 条件满足，false 超过次数仍未满足
       */
    }, {
      key: "pollCondition",
      value: function pollCondition(condition, interval, attempts) {
        for (var i = 0; i < attempts; i++) {
          if (condition()) return true;
          sleep(interval);
        }
        return false;
      }
    }]);
  }();
  /**
   * 主页步骤的简单实现
   *
   * 适用于任务流程的最后一个步骤，通过 task.goHome() 返回主页。
   */
  var HomeStep = /*#__PURE__*/function (_Step) {
    function HomeStep() {
      var _this2;
      _classCallCheck(this, HomeStep);
      _this2 = _callSuper(this, HomeStep, arguments);
      _this2.name = "回到主页";
      return _this2;
    }
    _inherits(HomeStep, _Step);
    return _createClass(HomeStep, [{
      key: "action",
      value: function action(ctx, task) {
        task.goHome();
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
    }]);
  }(Step);

  function recycleImage(img) {
    if (img && typeof img.recycle === "function") {
      img.recycle();
    }
  }

  var ScreenHelper = /*#__PURE__*/function () {
    function ScreenHelper() {
      _classCallCheck(this, ScreenHelper);
    }
    return _createClass(ScreenHelper, null, [{
      key: "isCaptureReady",
      get: function get() {
        return ScreenHelper._captureReady;
      }
    }, {
      key: "requestCapture",
      value: function requestCapture() {
        var landscape = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        if (ScreenHelper._captureReady) return true;
        var result = requestScreenCapture(landscape);
        if (result) {
          ScreenHelper._captureReady = true;
        }
        return result;
      }
    }, {
      key: "markCaptureReady",
      value: function markCaptureReady() {
        ScreenHelper._captureReady = true;
      }
    }, {
      key: "capture",
      value: function capture() {
        if (!ScreenHelper._captureReady) {
          throw new Error("截图权限未获取，请先调用 requestCapture()");
        }
        return captureScreen();
      }
    }, {
      key: "tryCapture",
      value: function tryCapture() {
        try {
          return ScreenHelper.capture();
        } catch (_a) {
          return null;
        }
      }
    }, {
      key: "findImage",
      value: function findImage(templatePath, options) {
        var _a;
        var img = ScreenHelper.capture();
        var template = images.load(templatePath);
        try {
          var region = options === null || options === void 0 ? void 0 : options.region;
          var result = images.findImage(img, template, {
            threshold: (_a = options === null || options === void 0 ? void 0 : options.threshold) !== null && _a !== void 0 ? _a : 0.9,
            region: region
          });
          if (result) return result;
          return null;
        } finally {
          recycleImage(img);
          recycleImage(template);
        }
      }
    }, {
      key: "findImageFromBase64",
      value: function findImageFromBase64(base64, options) {
        var _a;
        var img = ScreenHelper.capture();
        var template = images.fromBase64(base64);
        try {
          var region = options === null || options === void 0 ? void 0 : options.region;
          var result = images.findImage(img, template, {
            threshold: (_a = options === null || options === void 0 ? void 0 : options.threshold) !== null && _a !== void 0 ? _a : 0.9,
            region: region
          });
          if (result) return result;
          return null;
        } finally {
          recycleImage(img);
          recycleImage(template);
        }
      }
    }, {
      key: "findColor",
      value: function findColor(color, options) {
        var _a;
        var img = ScreenHelper.capture();
        try {
          var region = options === null || options === void 0 ? void 0 : options.region;
          var result = images.findColor(img, color, {
            region: region,
            threshold: (_a = options === null || options === void 0 ? void 0 : options.threshold) !== null && _a !== void 0 ? _a : 4
          });
          if (result) return result;
          return null;
        } finally {
          recycleImage(img);
        }
      }
    }, {
      key: "findMultiColors",
      value: function findMultiColors(config) {
        var img = ScreenHelper.capture();
        try {
          return ScreenHelper.findMultiColorsInImg(img, config);
        } finally {
          recycleImage(img);
        }
      }
    }, {
      key: "findMultiColorsInImg",
      value: function findMultiColorsInImg(img, config) {
        var _a;
        var region = config.region;
        var result = images.findMultiColors(img, config.firstColor, config.paths, {
          region: region,
          threshold: (_a = config.threshold) !== null && _a !== void 0 ? _a : 4
        });
        if (result) return result;
        return null;
      }
    }, {
      key: "detectsColor",
      value: function detectsColor(color, x, y, threshold) {
        var img = ScreenHelper.capture();
        try {
          return images.detectsColor(img, color, x, y, threshold);
        } finally {
          recycleImage(img);
        }
      }
    }, {
      key: "getPixel",
      value: function getPixel(x, y) {
        var img = ScreenHelper.capture();
        try {
          return images.pixel(img, x, y);
        } finally {
          recycleImage(img);
        }
      }
    }, {
      key: "swipe",
      value: function (_swipe) {
        function swipe(_x, _x2, _x3, _x4) {
          return _swipe.apply(this, arguments);
        }
        swipe.toString = function () {
          return _swipe.toString();
        };
        return swipe;
      }(function (x1, y1, x2, y2) {
        var duration = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 500;
        swipe(x1, y1, x2, y2, duration);
      })
    }, {
      key: "saveScreenshot",
      value: function saveScreenshot(path, format, quality) {
        var img = ScreenHelper.capture();
        try {
          images.save(img, path, format, quality);
        } finally {
          recycleImage(img);
        }
      }
    }]);
  }();
  ScreenHelper._captureReady = false;

  var TAG$3 = "OCR";
  var DEFAULT_OCR_CONFIG = {
    engine: "paddle",
    language: "zh"
  };
  var ocrConfig = Object.assign({}, DEFAULT_OCR_CONFIG);
  var paddleAvailable = null;
  function toRect(b) {
    return {
      left: b.left,
      top: b.top,
      right: b.right,
      bottom: b.bottom,
      width: function width() {
        return b.right - b.left;
      },
      height: function height() {
        return b.bottom - b.top;
      },
      centerX: function centerX() {
        return Math.round((b.left + b.right) / 2);
      },
      centerY: function centerY() {
        return Math.round((b.top + b.bottom) / 2);
      }
    };
  }
  function checkPaddleAvailable() {
    if (paddleAvailable !== null) return paddleAvailable;
    try {
      paddle.ocr(ScreenHelper.capture());
      paddleAvailable = true;
    } catch (e) {
      Logger.warn(TAG$3, "Paddle OCR 不可用，自动降级到 gmlkit: " + e);
      paddleAvailable = false;
    }
    return paddleAvailable;
  }
  function getEffectiveEngine() {
    if (ocrConfig.engine === "gmlkit") return "gmlkit";
    return checkPaddleAvailable() ? "paddle" : "gmlkit";
  }
  function recognizeWithPaddle(img) {
    var raw = paddle.ocr(img);
    return (raw || []).map(function (item) {
      return {
        text: item.words,
        bounds: toRect(item.bounds),
        confidence: item.confidence
      };
    });
  }
  function recognizeWithGmlkit(img) {
    var result = gmlkit.ocr(img, ocrConfig.language);
    if (!result || !result.blocks) return [];
    return result.blocks.map(function (block) {
      return {
        text: block.text,
        bounds: toRect(block.bounds),
        confidence: 1.0
      };
    });
  }
  function recognizeTextsWithPaddle(img) {
    var result = paddle.ocrText(img);
    return result || [];
  }
  function recognizeTextsWithGmlkit(img) {
    var result = gmlkit.ocr(img, ocrConfig.language);
    if (!result) return [];
    if (result.blocks) return result.blocks.map(function (b) {
      return b.text;
    });
    if (result.text) return [result.text];
    return [];
  }
  var OcrHelper = /*#__PURE__*/function () {
    function OcrHelper() {
      _classCallCheck(this, OcrHelper);
    }
    return _createClass(OcrHelper, null, [{
      key: "recognize",
      value: function recognize(img) {
        var target = img || ScreenHelper.capture();
        var engine = getEffectiveEngine();
        var results = engine === "gmlkit" ? recognizeWithGmlkit(target) : recognizeWithPaddle(target);
        if (!img) recycleImage(target);
        return results;
      }
    }, {
      key: "recognizeInRegion",
      value: function recognizeInRegion(region, img) {
        var target = img || ScreenHelper.capture();
        var ownImg = !img;
        try {
          // region 已经是实际设备坐标，直接裁剪
          var clipped = images.clip(target, region.x, region.y, region.w, region.h);
          var engine = getEffectiveEngine();
          var results = engine === "gmlkit" ? recognizeWithGmlkit(clipped) : recognizeWithPaddle(clipped);
          recycleImage(clipped);
          return results.map(function (item) {
            // 子图坐标 → 全图坐标（实际坐标，无需缩放）
            var fullLeft = item.bounds.left + region.x;
            var fullTop = item.bounds.top + region.y;
            var fullRight = item.bounds.right + region.x;
            var fullBottom = item.bounds.bottom + region.y;
            return {
              text: item.text,
              bounds: toRect({
                left: fullLeft,
                top: fullTop,
                right: fullRight,
                bottom: fullBottom
              }),
              confidence: item.confidence
            };
          });
        } finally {
          if (ownImg) recycleImage(target);
        }
      }
    }, {
      key: "recognizeTexts",
      value: function recognizeTexts(img) {
        var target = img || ScreenHelper.capture();
        var engine = getEffectiveEngine();
        var results = engine === "gmlkit" ? recognizeTextsWithGmlkit(target) : recognizeTextsWithPaddle(target);
        if (!img) recycleImage(target);
        return results;
      }
    }, {
      key: "recognizeTextsInRegion",
      value: function recognizeTextsInRegion(region, img) {
        var results = OcrHelper.recognizeInRegion(region, img);
        return results.map(function (r) {
          return r.text;
        });
      }
    }, {
      key: "findText",
      value: function findText(target, img) {
        var results = target.region ? OcrHelper.recognizeInRegion(target.region, img) : OcrHelper.recognize(img);
        var _iterator = _createForOfIteratorHelper(results),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var item = _step.value;
            if (item.text.includes(target.text)) {
              return item;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        return null;
      }
    }, {
      key: "findTextExact",
      value: function findTextExact(target, img) {
        var results = target.region ? OcrHelper.recognizeInRegion(target.region, img) : OcrHelper.recognize(img);
        var _iterator2 = _createForOfIteratorHelper(results),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var item = _step2.value;
            if (item.text === target.text) {
              return item;
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        return null;
      }
    }, {
      key: "hasText",
      value: function hasText(target, img) {
        return OcrHelper.findText(target, img) !== null;
      }
    }, {
      key: "hasTextExact",
      value: function hasTextExact(target, img) {
        return OcrHelper.findTextExact(target, img) !== null;
      }
    }, {
      key: "findAllTexts",
      value: function findAllTexts(target, img) {
        var results = target.region ? OcrHelper.recognizeInRegion(target.region, img) : OcrHelper.recognize(img);
        return results.filter(function (item) {
          return item.text.includes(target.text);
        });
      }
    }, {
      key: "clickText",
      value: function clickText(target, img) {
        var match = OcrHelper.findText(target, img);
        if (match) {
          // match.bounds 已经是实际坐标，直接点击
          click(match.bounds.centerX(), match.bounds.centerY());
          return true;
        }
        return false;
      }
    }]);
  }();

  var ClickHelper = /*#__PURE__*/function () {
    function ClickHelper() {
      _classCallCheck(this, ClickHelper);
    }
    return _createClass(ClickHelper, null, [{
      key: "setOffset",
      value: function setOffset(x, y) {
        ClickHelper._offsetX = x;
        ClickHelper._offsetY = y;
      }
    }, {
      key: "tap",
      value: function tap(x, y) {
        var randomRange = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;
        var rx = x + ClickHelper._offsetX + (randomRange ? random(-randomRange, randomRange) : 0);
        var ry = y + ClickHelper._offsetY + (randomRange ? random(-randomRange, randomRange) : 0);
        click(rx, ry);
      }
    }, {
      key: "tapPoint",
      value: function tapPoint(point) {
        var randomRange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
        ClickHelper.tap(point.x, point.y, randomRange);
      }
    }, {
      key: "tapCenter",
      value: function tapCenter(rect) {
        var randomRange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
        ClickHelper.tap(rect.centerX(), rect.centerY(), randomRange);
      }
    }, {
      key: "longPress",
      value: function longPress(x, y) {
        longClick(x + ClickHelper._offsetX, y + ClickHelper._offsetY);
      }
    }, {
      key: "pressAndHold",
      value: function pressAndHold(x, y, duration) {
        press(x + ClickHelper._offsetX, y + ClickHelper._offsetY, duration);
      }
    }, {
      key: "swipe",
      value: function (_swipe) {
        function swipe(_x, _x2, _x3, _x4) {
          return _swipe.apply(this, arguments);
        }
        swipe.toString = function () {
          return _swipe.toString();
        };
        return swipe;
      }(function (x1, y1, x2, y2) {
        var duration = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 500;
        swipe(x1 + ClickHelper._offsetX, y1 + ClickHelper._offsetY, x2 + ClickHelper._offsetX, y2 + ClickHelper._offsetY, duration);
      })
    }, {
      key: "tapByText",
      value: function tapByText(target, img) {
        return OcrHelper.clickText(target, img);
      }
    }, {
      key: "tapByTextContains",
      value: function tapByTextContains(target, img) {
        return OcrHelper.clickText(target, img);
      }
    }, {
      key: "multiTap",
      value: function multiTap(points) {
        var interval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
        var _iterator = _createForOfIteratorHelper(points),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _step$value = _slicedToArray(_step.value, 2),
              x = _step$value[0],
              y = _step$value[1];
            ClickHelper.tap(x, y, 0);
            sleep(interval);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }]);
  }();
  ClickHelper._offsetX = 0;
  ClickHelper._offsetY = 0;
  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var TAG$2 = "ScaleHelper";
  var ScaleHelper = /*#__PURE__*/function () {
    function ScaleHelper() {
      _classCallCheck(this, ScaleHelper);
    }
    return _createClass(ScaleHelper, null, [{
      key: "init",
      value: function init() {
        if (ScaleHelper._initialized) return;
        var actualW = device.width;
        var actualH = device.height;
        try {
          var img = captureScreen();
          if (img) {
            actualW = img.width;
            actualH = img.height;
            recycleImage(img);
          }
        } catch (_a) {
          // 截图失败时使用 device API 的值
        }
        ScaleHelper._screenWidth = actualW;
        ScaleHelper._screenHeight = actualH;
        ScaleHelper._initialized = true;
        Logger.info(TAG$2, "\u521D\u59CB\u5316\u5B8C\u6210: \u622A\u56FE\u5206\u8FA8\u7387=".concat(actualW, "x").concat(actualH));
      }
    }, {
      key: "screenWidth",
      get: function get() {
        return ScaleHelper._screenWidth;
      }
    }, {
      key: "screenHeight",
      get: function get() {
        return ScaleHelper._screenHeight;
      }
    }, {
      key: "isInitialized",
      get: function get() {
        return ScaleHelper._initialized;
      }
    }]);
  }();
  ScaleHelper._screenWidth = 0;
  ScaleHelper._screenHeight = 0;
  ScaleHelper._initialized = false;

  var systemConfig = {
    game: {
      packageName: "com.bwxrk.yqmy.ty4",
      enterGamePos: {
        x: 557,
        y: 2153
      },
      mainTabPos: {
        x: 532,
        y: 2298
      },
      lobbyColor: {
        desc: "大厅",
        firstColor: "#f9efdb",
        paths: [[-21, -6, "#5a4127"], [65, -4, "#5a4127"], [86, 22, "#f3c060"], [-46, 22, "#f3c060"]],
        region: [463, 2347, 152, 48]
      },
      launchDelay: 3000,
      dualAppDelay: 8000,
      maxNavigateAttempts: 5,
      dualApp: {
        desc: "双开应用选择",
        text: "保卫向日葵",
        region: {
          x: 241,
          y: 2034,
          w: 207,
          h: 68
        }
      },
      lobby: {
        desc: "大厅底部商城按钮",
        text: "商",
        region: {
          x: 20,
          y: 2308,
          w: 142,
          h: 91
        }
      },
      enterGame: {
        desc: "登录页进入游戏按钮",
        text: "进入游戏",
        region: {
          x: 328,
          y: 2086,
          w: 409,
          h: 134
        }
      },
      announce: {
        desc: "公告弹窗标题",
        text: "公告",
        region: {
          x: 481,
          y: 618,
          w: 116,
          h: 60
        }
      },
      backBtnColor: {
        desc: "返回按钮",
        firstColor: "#d8dba0",
        paths: [[-13, -4, "#f6da96"], [-58, -34, "#fbeab7"], [-84, -13, "#fbeab7"], [-70, 5, "#fbeab7"], [-56, 18, "#fbeab7"], [-33, -11, "#fbeab7"]],
        region: [34, 2285, 104, 72]
      },
      dualApp2Pos: {
        x: 737,
        y: 1960
      }
    },
    playTab: {
      playTabPos: {
        x: 849,
        y: 2305
      },
      playTabOpened: {
        desc: "玩法tab",
        firstColor: "#ea612f",
        paths: [[-36, 16, "#c8822c"], [29, 19, "#c9822c"], [-5, 25, "#937bd7"], [-1, 50, "#3c2e69"], [-13, 9, "#685351"]],
        region: [776, 2247, 116, 136]
      }
    },
    scroll: {
      dailyDungeonText: {
        desc: "日常副本",
        text: "日常副本",
        region: {
          x: 756,
          y: 237,
          w: 270,
          h: 82
        }
      },
      maxScrollRetries: 5,
      swipeStartPos: {
        x: 556,
        y: 933
      },
      swipeEndPos: {
        x: 563,
        y: 1115
      }
    }
  };

  var dailyConfig = {
    staminaGift: {
      friendPanelPos: {
        x: 813,
        y: 285
      },
      receiveStaminaPos: {
        x: 846,
        y: 1703
      },
      oneClickReceivePos: {
        x: 540,
        y: 1613
      },
      closePanelPos: {
        x: 902,
        y: 646
      },
      oneClickSendPos: {
        x: 507,
        y: 1696
      },
      receiveStamina: {
        desc: "领取体力",
        text: "领取体力",
        region: {
          x: 723,
          y: 1658,
          w: 242,
          h: 97
        }
      },
      oneClickReceive: {
        desc: "一键领取按钮",
        text: "领取",
        region: {
          x: 538,
          y: 1575,
          w: 102,
          h: 66
        }
      },
      oneClickReceiveColor: {
        desc: "一键领取按钮灰色",
        firstColor: "#bcbcbc",
        paths: [[8, 21, "#bcbcbc"], [1, 38, "#9c9c9c"], [-31, 24, "#5a5a5a"], [-9, 42, "#bdbdbd"]],
        region: [604, 1576, 75, 76]
      }
    },
    travel: {
      travelPos: {
        x: 120,
        y: 1916
      },
      quickTravelPos: {
        x: 412,
        y: 1713
      },
      travelTitle: {
        desc: "游历标题",
        text: "游历",
        region: {
          x: 477,
          y: 965,
          w: 123,
          h: 68
        }
      }
    },
    stage: {
      startBattlePos: {
        x: 553,
        y: 1889
      },
      battlePos: {
        x: 705,
        y: 1936
      },
      pausePos: {
        x: 73,
        y: 168
      },
      exitPos: {
        x: 218,
        y: 2131
      },
      confirmExitPos: {
        x: 744,
        y: 1442
      },
      settleBtn: {
        desc: "结算页面按钮",
        text: "确定",
        region: {
          x: 662,
          y: 2114,
          w: 106,
          h: 61
        }
      },
      battleBtn: {
        desc: "出战按钮",
        text: "出战",
        region: {
          x: 643,
          y: 1913,
          w: 133,
          h: 63
        }
      },
      refreshBtn: {
        desc: "刷新按钮",
        text: "刷新",
        region: {
          x: 780,
          y: 2277,
          w: 135,
          h: 73
        }
      },
      exitBtn: {
        desc: "退出按钮",
        text: "退出",
        region: {
          x: 160,
          y: 2107,
          w: 118,
          h: 63
        }
      },
      confirmBtn: {
        desc: "确定按钮",
        text: "确定",
        region: {
          x: 685,
          y: 1412,
          w: 112,
          h: 68
        }
      },
      startBattleBtn: {
        desc: "开始战斗",
        text: "开始战斗",
        region: {
          x: 417,
          y: 1842,
          w: 243,
          h: 69
        }
      },
      doubleRewardBtn: {
        desc: "双倍奖励",
        text: "双倍",
        region: {
          x: 869,
          y: 2113,
          w: 182,
          h: 62
        }
      },
      doubleRewardPos: {
        x: 900,
        y: 2124
      },
      closeRewardPos: {
        x: 480,
        y: 2318
      },
      settlePos: {
        x: 727,
        y: 2144
      }
    },
    buyStamina: {
      staminaPos: {
        x: 636,
        y: 159
      },
      buyStaminaPos: {
        x: 377,
        y: 1326
      },
      supplementTitle: {
        desc: "补充体力",
        text: "补充体力",
        region: {
          x: 416,
          y: 837,
          w: 243,
          h: 80
        }
      },
      freeBuyStaminaIcon: {
        desc: "免费购买体力图标",
        firstColor: "#f9efdb",
        paths: [[13, -11, "#293e48"], [-47, 6, "#4cc3f3"], [-30, 5, "#ffce52"], [-17, 9, "#293e48"]],
        region: [251, 1303, 81, 37]
      }
    },
    shop: {
      mainMenu: {
        desc: "主菜单",
        text: "主菜单"
      },
      shop: {
        desc: "商店入口",
        text: "商店"
      },
      dailyDeals: {
        desc: "每日特惠",
        text: "每日特惠"
      },
      expPotion: {
        desc: "经验药水",
        text: "经验药水"
      },
      buySuccess: {
        desc: "购买成功提示",
        text: "购买成功"
      }
    },
    summon: {
      enterSummonPos: {
        desc: "召唤入口按钮",
        x: 984,
        y: 1913
      },
      abandonBtnPos: {
        desc: "放弃按钮",
        x: 323,
        y: 2101
      },
      summonPos: {
        desc: "召唤按钮",
        x: 662,
        y: 2085
      },
      closeRewardPos: {
        desc: "关闭奖励弹窗",
        x: 569,
        y: 1620
      },
      naturalSummon: {
        desc: "自然召唤tab",
        text: "自然召唤",
        region: {
          x: 190,
          y: 2323,
          w: 885,
          h: 69
        }
      },
      abandonBtn: {
        desc: "放弃按钮",
        text: "放弃",
        region: {
          x: 260,
          y: 2063,
          w: 131,
          h: 73
        }
      },
      autoSummon: {
        desc: "自动召唤",
        text: "自动召唤",
        region: {
          x: 257,
          y: 2061,
          w: 227,
          h: 72
        }
      }
    },
    plantWish: {
      enterWishPos: {
        desc: "祈愿入口按钮",
        x: 984,
        y: 1913
      },
      freeWishPos: {
        desc: "免费祈愿按钮",
        x: 171,
        y: 1936
      },
      plantWish: {
        desc: "植物祈愿tab",
        text: "植物祈愿",
        region: {
          x: 192,
          y: 2334,
          w: 881,
          h: 51
        }
      },
      wishResultColor: {
        desc: "祈愿结果",
        firstColor: "#f1b92c",
        paths: [[0, 13, "#feef61"], [-1, 41, "#50a8a4"], [-38, 28, "#4da7ab"], [33, 54, "#54ada1"], [9, 65, "#fcd03c"]]
      }
    }
  };

  var guildConfig = {
    hunt: {
      guildTabPos: {
        x: 693,
        y: 2316
      },
      huntEntryPos: {
        x: 152,
        y: 1335
      },
      challengePos: {
        x: 550,
        y: 2296
      },
      autoDeployPos: {
        x: 351,
        y: 2316
      },
      startChallengePos: {
        x: 953,
        y: 2311
      },
      guildHall: {
        desc: "工会大厅",
        text: "大厅",
        region: {
          x: 357,
          y: 397,
          w: 95,
          h: 48
        }
      },
      challenge: {
        desc: "挑战按钮",
        text: "挑战",
        region: {
          x: 459,
          y: 2251,
          w: 160,
          h: 96
        }
      },
      startChallenge: {
        desc: "开始挑战按钮",
        text: "开始挑战",
        region: {
          x: 838,
          y: 2277,
          w: 212,
          h: 68
        }
      },
      confirmStartChallenge: {
        desc: "二次确认开始挑战按钮",
        text: "开始挑战",
        region: {
          x: 624,
          y: 2238,
          w: 227,
          h: 80
        }
      },
      deployBtn: {
        desc: "上阵/下阵按钮区域",
        text: "上阵",
        region: {
          x: 218,
          y: 2268,
          w: 244,
          h: 91
        }
      },
      undeployBtn: {
        desc: "一键下阵",
        text: "下阵",
        region: {
          x: 218,
          y: 2268,
          w: 244,
          h: 91
        }
      },
      plantCount: {
        desc: "植物数量",
        text: "6",
        region: {
          x: 957,
          y: 1171,
          w: 37,
          h: 67
        }
      },
      dailySettle: {
        desc: "每日结算",
        text: "每日结算中",
        region: {
          x: 310,
          y: 2271,
          w: 232,
          h: 77
        }
      },
      challengeEnd: {
        desc: "挑战结束",
        text: "挑战结束",
        region: {
          x: 186,
          y: 759,
          w: 670,
          h: 221
        }
      },
      autoReleaseSkill: {
        desc: "判断挑战",
        text: "自动释放",
        region: {
          x: 197,
          y: 2164,
          w: 131,
          h: 51
        }
      },
      reviveBtnColor: {
        desc: "复活按钮",
        firstColor: "#c67339",
        paths: [[40, 1, "#d47e3c"], [24, 17, "#f0d0ad"], [-6, 9, "#b85e1a"], [48, 8, "#c07537"], [22, 33, "#fcefdc"]],
        region: [935, 934, 74, 53]
      },
      battleCheckInterval: 5000,
      maxBackAttempts: 10,
      backToChallengePos: {
        x: 721,
        y: 2140
      }
    },
    donate: {
      guildTabPos: {
        x: 693,
        y: 2316
      },
      donateEntryPos: {
        x: 1008,
        y: 2038
      },
      goldDonateBtnPos: {
        x: 907,
        y: 1192
      },
      confirmDonatePos: {
        x: 500,
        y: 1600
      },
      closePopupPos: {
        x: 500,
        y: 1900
      },
      donateBtnRedDot: {
        desc: "捐献按钮红点",
        firstColor: "#ff5130",
        paths: [[11, -5, "#f9efdb"], [8, 11, "#f4e9de"], [-152, 40, "#e78200"], [-163, 36, "#feef8d"]],
        region: [310, 2271, 232, 77]
      },
      guildHall: {
        desc: "工会大厅",
        text: "大厅",
        region: {
          x: 357,
          y: 397,
          w: 95,
          h: 48
        }
      },
      donateBtn: {
        desc: "捐献按钮",
        text: "捐献",
        region: {
          x: 717,
          y: 2335,
          w: 103,
          h: 51
        }
      },
      donateSuccess: {
        desc: "捐献成功提示",
        text: "捐献成功",
        region: {
          x: 400,
          y: 1000,
          w: 300,
          h: 80
        }
      },
      goldDonate: {
        desc: "金币捐献",
        text: "金币捐献",
        region: {
          x: 200,
          y: 800,
          w: 200,
          h: 80
        }
      },
      confirmBtn: {
        desc: "确认按钮",
        text: "确认",
        region: {
          x: 500,
          y: 1500,
          w: 200,
          h: 80
        }
      },
      closeBtn: {
        desc: "关闭按钮",
        text: "关闭",
        region: {
          x: 500,
          y: 1800,
          w: 200,
          h: 80
        }
      },
      donateLimit: {
        desc: "已达上限",
        text: "已达上限",
        region: {
          x: 825,
          y: 1179,
          w: 180,
          h: 61
        }
      }
    },
    chat: {
      channelEntryPos: {
        x: 578,
        y: 2178
      },
      guildChannelPos: {
        x: 620,
        y: 1986
      },
      inputBoxPos: {
        x: 684,
        y: 1837
      },
      emojiPos: {
        x: 154,
        y: 1288
      },
      sendBtnPos: {
        x: 894,
        y: 1845
      },
      closeBtnPos: {
        x: 975,
        y: 538
      },
      channelOpened: {
        desc: "频道已打开",
        firstColor: "#ff9479",
        paths: [[-18, -14, "#f2af8d"], [18, -14, "#f2b08d"], [10, -23, "#8e733c"], [-12, -24, "#8e733d"], [-1, -35, "#ffe793"]]
      },
      guildChannelSelected: {
        desc: "工会频道已选中",
        firstColor: "#d3a57a",
        paths: [[-21, 8, "#9a5d39"], [25, 6, "#9a5d39"], [-18, 53, "#fcebbe"], [12, 47, "#fcebbe"], [-47, 48, "#915735"], [53, 47, "#9a5c37"]]
      },
      inputPlaceholder: {
        desc: "请输入内容",
        text: "内容",
        region: {
          x: 196,
          y: 1814,
          w: 87,
          h: 54
        }
      }
    },
    assist: {
      manorPos: {
        x: 998,
        y: 2318
      },
      neighborPanelPos: {
        x: 1001,
        y: 1575
      },
      visitBtnPos: {
        x: 917,
        y: 1107
      },
      assistBtnPos: {
        x: 105,
        y: 2071
      },
      likeBtnPos: {
        x: 516,
        y: 256
      },
      backToNeighborPos: {
        x: 998,
        y: 1916
      },
      manorOpened: {
        desc: "庄园已打开",
        firstColor: "#fd942f",
        paths: [[1, -17, "#7ea31f"], [92, -21, "#e2f393"], [114, -24, "#e3f396"], [107, -5, "#e3f79a"], [104, -16, "#7da020"], [92, -7, "#7ea120"], [53, -18, "#759a88"], [-7, -40, "#759a88"]],
        region: [913, 2237, 156, 158]
      },
      neighborPanel: {
        desc: "好友",
        text: "好友",
        region: {
          x: 472,
          y: 551,
          w: 135,
          h: 74
        }
      },
      assistableColor: {
        desc: "可协助好友",
        firstColor: "#90dd6d",
        paths: [[-97, 15, "#40992b"], [2, 41, "#9ee566"], [-47, 43, "#96ec66"], [-94, 30, "#4ba632"], [-42, -1, "#89e06d"]],
        region: [643, 1068, 196, 112]
      },
      oneClickColor: {
        desc: "一键协助按钮红点",
        firstColor: "#ff5032",
        paths: [[-7, -8, "#f9efdb"], [-9, 8, "#f4e9de"], [-18, -3, "#ff5032"], [-38, 15, "#e4933b"], [-80, 18, "#648cc3"]],
        region: [50, 1987, 120, 58]
      },
      oneClickAssist: {
        desc: "一键协助",
        text: "一键协助",
        region: {
          x: 22,
          y: 2088,
          w: 156,
          h: 49
        }
      },
      oneClickAssistReward: {
        desc: "协助奖励",
        text: "恭喜获得",
        region: {
          x: 396,
          y: 969,
          w: 283,
          h: 83
        }
      }
    }
  };

  var dungeonConfig = {
    elite: {
      eliteChallengePos: {
        x: 897,
        y: 1169
      },
      sweepPos: {
        x: 979,
        y: 1801
      },
      closeSweepPos: {
        x: 945,
        y: 698
      },
      eliteTitle: {
        desc: "精英挑战标题",
        text: "精英挑战",
        region: {
          x: 432,
          y: 150,
          w: 218,
          h: 74
        }
      },
      sweepText: {
        desc: "扫荡按钮",
        text: "扫荡",
        region: {
          x: 471,
          y: 648,
          w: 145,
          h: 63
        }
      },
      limitReached: {
        desc: "已达上限",
        text: "已达上限",
        region: {
          x: 708,
          y: 917,
          w: 182,
          h: 74
        }
      },
      confirmSweepPos: {
        x: 803,
        y: 958
      }
    },
    dungeon: {
      dailyDungeonPos: {
        x: 920,
        y: 291
      },
      goldExplorePos: {
        x: 781,
        y: 2315
      },
      goldSweepPos: {
        x: 912,
        y: 1955
      },
      materialExplorePos: {
        x: 955,
        y: 2305
      },
      materialSweepPos: {
        x: 907,
        y: 1961
      },
      goldText: {
        desc: "金币",
        text: "金币",
        region: {
          x: 723,
          y: 2323,
          w: 111,
          h: 62
        }
      }
    },
    arena: {
      maxNavigateAttempts: 5,
      matchTimeout: 300000,
      arena: {
        desc: "竞技对决标题",
        text: "竞技对决",
        region: {
          x: 360,
          y: 235,
          w: 377,
          h: 116
        }
      },
      quickMatch: {
        desc: "快速匹配按钮",
        text: "快速匹配",
        region: {
          x: 652,
          y: 2258,
          w: 221,
          h: 79
        }
      },
      cancelMatch: {
        desc: "取消匹配按钮",
        text: "取消匹配",
        region: {
          x: 262,
          y: 1391,
          w: 205,
          h: 76
        }
      },
      refresh: {
        desc: "刷新(匹配成功)",
        text: "刷新",
        region: {
          x: 509,
          y: 2312,
          w: 158,
          h: 87
        }
      },
      eliminated: {
        desc: "淘汰提示",
        text: "淘汰",
        region: {
          x: 368,
          y: 308,
          w: 304,
          h: 263
        }
      },
      winner: {
        desc: "吃鸡提示",
        text: "吃鸡",
        region: {
          x: 368,
          y: 308,
          w: 304,
          h: 263
        }
      },
      arenaEntryPos: {
        x: 102,
        y: 2064
      }
    },
    abyss: {
      abyssLordPos: {
        x: 891,
        y: 857
      },
      abyssLordTitle: {
        desc: "深渊领主标题",
        text: "深渊领主",
        region: {
          x: 357,
          y: 206,
          w: 372,
          h: 107
        }
      },
      saoDangBtn: {
        desc: "扫荡按钮",
        text: "扫荡",
        region: {
          x: 374,
          y: 2267,
          w: 112,
          h: 67
        }
      },
      saoDangCount: {
        desc: "扫荡次数",
        text: "0",
        region: {
          x: 847,
          y: 2171,
          w: 116,
          h: 74
        }
      },
      settleBtn: {
        desc: "结算按钮",
        text: "确定",
        region: {
          x: 425,
          y: 2092,
          w: 230,
          h: 98
        }
      },
      saoDangPos: {
        x: 446,
        y: 2303
      },
      confirmSweepPos: {
        x: 739,
        y: 1435
      },
      settlePos: {
        x: 544,
        y: 2142
      }
    },
    trial: {
      trialLandPos: {
        x: 904,
        y: 1720
      },
      sweepPos: {
        x: 800,
        y: 2317
      },
      freeSweepPos: {
        x: 875,
        y: 1655
      },
      backToPlayPos: {
        x: 73,
        y: 2324
      },
      sweepText: {
        desc: "扫荡按钮",
        text: "扫荡",
        region: {
          x: 752,
          y: 2330,
          w: 99,
          h: 59
        }
      },
      limitReached: {
        desc: "已达上限",
        text: "已达上限",
        region: {
          x: 789,
          y: 1626,
          w: 170,
          h: 70
        }
      }
    }
  };

  var CONFIG_1080x2400 = {
    system: systemConfig,
    daily: dailyConfig,
    guild: guildConfig,
    dungeon: dungeonConfig
  };
  var SUPPORTED_RESOLUTIONS = {
    "1080x2400": CONFIG_1080x2400
  };
  var _currentConfig = null;
  function initConfig() {
    var w = ScaleHelper.screenWidth;
    var h = ScaleHelper.screenHeight;
    var key = "".concat(w, "x").concat(h);
    var config = SUPPORTED_RESOLUTIONS[key];
    if (!config) {
      var supported = Object.keys(SUPPORTED_RESOLUTIONS).join(", ");
      throw new Error("\u5206\u8FA8\u7387 ".concat(key, " \u672A\u9002\u914D\uFF0C\u5F53\u524D\u652F\u6301\u7684\u5206\u8FA8\u7387: ").concat(supported, "\u3002\u8BF7\u5728 src/config/resolutions/").concat(key, "/ \u4E0B\u6DFB\u52A0\u914D\u7F6E"));
    }
    _currentConfig = config;
  }
  function getConfig() {
    if (!_currentConfig) {
      throw new Error("配置未初始化，请先调用 initConfig()");
    }
    return _currentConfig;
  }

  var AppState;
  (function (AppState) {
    AppState[AppState["UNKNOWN"] = 0] = "UNKNOWN";
    AppState[AppState["LOGIN"] = 1] = "LOGIN";
    AppState[AppState["LOBBY"] = 2] = "LOBBY";
    AppState[AppState["IN_APP"] = 3] = "IN_APP";
    AppState[AppState["ANNOUNCE"] = 4] = "ANNOUNCE";
    AppState[AppState["LOBBY_CONFIRMED"] = 5] = "LOBBY_CONFIRMED";
  })(AppState || (AppState = {}));
  var TAG$1 = "GameBase";
  var GameHome = /*#__PURE__*/function (_HomeStep) {
    function GameHome() {
      var _this;
      _classCallCheck(this, GameHome);
      _this = _callSuper(this, GameHome, arguments);
      _this.name = "游戏大厅";
      _this.nextStepName = STEP_END;
      return _this;
    }
    _inherits(GameHome, _HomeStep);
    return _createClass(GameHome, [{
      key: "action",
      value: function action(ctx, task) {}
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return this.nextStepName;
      }
    }]);
  }(HomeStep);
  var LaunchApp = /*#__PURE__*/function (_Step) {
    function LaunchApp() {
      var _this2;
      _classCallCheck(this, LaunchApp);
      _this2 = _callSuper(this, LaunchApp, arguments);
      _this2.name = "启动应用";
      return _this2;
    }
    _inherits(LaunchApp, _Step);
    return _createClass(LaunchApp, [{
      key: "action",
      value: function action(ctx, task) {
        // 判断是否在当前应用中
        if (currentPackage() !== task.packageName) {
          launch(task.packageName);
          Logger.info(TAG$1, "等待应用启动完成");
          sleep(getConfig().system.game.launchDelay);
        }
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        if (currentPackage() === getConfig().system.game.packageName) {
          // 启动时，如果是在当前应用，代表游戏已经启动，直接跳转大厅页面
          return NavigateToLobby.name;
        }
        return HandleDualApp.name;
      }
    }]);
  }(Step);
  var DualAppMode = {
    NONE: 0,
    DUAL1: 1,
    DUAL2: 2
  };
  var HandleDualApp = /*#__PURE__*/function (_Step2) {
    function HandleDualApp() {
      var _this3;
      var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DualAppMode.NONE;
      _classCallCheck(this, HandleDualApp);
      _this3 = _callSuper(this, HandleDualApp);
      _this3.name = "处理双开";
      _this3._mode = mode;
      return _this3;
    }
    _inherits(HandleDualApp, _Step2);
    return _createClass(HandleDualApp, [{
      key: "canSkip",
      value: function canSkip(ctx, task) {
        // 不需要双开，直接启动app即可
        if (this._mode === DualAppMode.NONE) return true;
        // 如果当前应用是游戏应用，代表游戏已经启动，直接下一步
        if (currentPackage() === getConfig().system.game.packageName) {
          sleep(3000);
          return true;
        }
        return false;
      }
    }, {
      key: "action",
      value: function action(ctx, task) {
        // 不需要双开，直接启动app即可
        if (this._mode === DualAppMode.NONE) {
          Logger.info(TAG$1, "不需要双开，直接启动app");
          return;
        }
        Logger.info(TAG$1, "等待应用启动完成");
        // 点击双开的第一个位置
        if (this._mode === DualAppMode.DUAL1) {
          var dualApp = getConfig().system.game.dualApp;
          var match = OcrHelper.findText(dualApp);
          if (match) {
            Logger.info(TAG$1, "检测到双开选择，点击应用1");
            ClickHelper.tapCenter(match.bounds);
            sleep(getConfig().system.game.dualAppDelay);
            Logger.info(TAG$1, "等待应用启动完成");
          } else {
            Logger.error(TAG$1, "未检测到双开1选择");
            sleep(1000);
          }
        }
        // 点击双开的第二个位置
        if (this._mode === DualAppMode.DUAL2) {
          Logger.info(TAG$1, "检测到双开选择，点击应用2");
          // TODO: 双开2逻辑
          ClickHelper.tap(getConfig().system.game.dualApp2Pos.x, getConfig().system.game.dualApp2Pos.y);
          sleep(getConfig().system.game.dualAppDelay);
        }
        Logger.info(TAG$1, "应用启动完成");
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return NavigateToLobby.name;
      }
    }]);
  }(Step);
  var CloseAnnounce = /*#__PURE__*/function (_Step3) {
    function CloseAnnounce() {
      var _this4;
      _classCallCheck(this, CloseAnnounce);
      _this4 = _callSuper(this, CloseAnnounce, arguments);
      _this4.name = "关闭公告";
      return _this4;
    }
    _inherits(CloseAnnounce, _Step3);
    return _createClass(CloseAnnounce, [{
      key: "action",
      value: function action(ctx, task) {
        var match = OcrHelper.findText(getConfig().system.game.announce);
        if (match) {
          Logger.info(TAG$1, "检测到公告弹窗，点击关闭");
          ClickHelper.tapCenter(match.bounds);
        }
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return EnterGame.name;
      }
    }]);
  }(Step);
  var EnterGame = /*#__PURE__*/function (_Step4) {
    function EnterGame() {
      var _this5;
      _classCallCheck(this, EnterGame);
      _this5 = _callSuper(this, EnterGame, arguments);
      _this5.name = "进入游戏";
      return _this5;
    }
    _inherits(EnterGame, _Step4);
    return _createClass(EnterGame, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().system.game.enterGamePos.x, getConfig().system.game.enterGamePos.y);
        sleep(300);
        ClickHelper.tap(getConfig().system.game.enterGamePos.x, getConfig().system.game.enterGamePos.y);
        sleep(6000);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return OcrHelper.hasText(getConfig().system.game.lobby);
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return NavigateToLobby.name;
      }
    }]);
  }(Step);
  var GoHomePage = /*#__PURE__*/function (_Step5) {
    function GoHomePage() {
      var _this6;
      _classCallCheck(this, GoHomePage);
      _this6 = _callSuper(this, GoHomePage, arguments);
      _this6.name = "返回主页";
      return _this6;
    }
    _inherits(GoHomePage, _Step5);
    return _createClass(GoHomePage, [{
      key: "action",
      value: function action(ctx, task) {
        // 检查主页tab颜色是否选中
        var attempt = getConfig().system.game.maxNavigateAttempts;
        while (true) {
          if (isLobbyConfirmed()) {
            Logger.info(TAG$1, "检测到主页tab，返回主页成功");
            break;
          }
          // 返回一次
          Logger.info(TAG$1, "返回" + (attempt + "次"));
          var match = ScreenHelper.findMultiColors(getConfig().system.game.backBtnColor);
          if (match) {
            Logger.info(TAG$1, "检测到返回按钮，点击返回");
            ClickHelper.tap(match.x, match.y);
            sleep(500);
            break;
          } else {
            back();
          }
          attempt--;
          sleep(1000);
          if (attempt <= 0) {
            Logger.error(TAG$1, "返回主页失败，超过最大尝试次数");
            throw new Error("返回主页失败，超过最大尝试次数");
          }
        }
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return GameHome.name;
      }
    }]);
  }(Step);
  var NavigateToLobby = /*#__PURE__*/function (_Step6) {
    function NavigateToLobby() {
      var _this7;
      _classCallCheck(this, NavigateToLobby);
      _this7 = _callSuper(this, NavigateToLobby, arguments);
      _this7.name = "导航至大厅";
      _this7.confirmAttempts = 10;
      _this7.nextStepName = GameHome.name;
      return _this7;
    }
    _inherits(NavigateToLobby, _Step6);
    return _createClass(NavigateToLobby, [{
      key: "action",
      value: function action(ctx, task) {
        /**
         * 这个步骤是为了应用在后台热启动时，能够执行到正确的步骤
         * 有几种情况
         * 1. 冷启动，完整的进入游戏主界面流程
         * 2. 热启动，打开游戏后，显示的是在大厅页面，并且没有弹窗，就是最终页面
         * 3. 热启动，打开游戏后，显示的是在子页面，需要返回到大厅页面
         * 4. 热启动，打开游戏后，显示的是在大厅页面，但是有弹窗，需要关闭弹窗。
         *
         * */
        var attempt = 3;
        this.nextStepName = CloseAnnounce.name;
        var lastState = AppState.UNKNOWN;
        while (attempt > 0) {
          var state = this.detectState();
          if (state === lastState) {
            attempt--;
            sleep(1000);
            continue;
          }
          lastState = state;
          switch (state) {
            case AppState.ANNOUNCE:
              Logger.info(TAG$1, "检测到公告弹窗，点击关闭");
              this.nextStepName = CloseAnnounce.name;
              return;
            case AppState.LOGIN:
              Logger.info(TAG$1, "登录页，点击进入游戏");
              this.nextStepName = EnterGame.name;
              return;
            case AppState.LOBBY:
              Logger.info(TAG$1, "大厅页面，关闭弹窗");
              this.nextStepName = GoHomePage.name;
              return;
            case AppState.IN_APP:
              Logger.info(TAG$1, "子页面，返回");
              this.nextStepName = GoHomePage.name;
              return;
            case AppState.LOBBY_CONFIRMED:
              Logger.info(TAG$1, "已确认到达大厅");
              this.nextStepName = GameHome.name;
              return;
            default:
              Logger.info(TAG$1, "未检测到状态，重试...");
              sleep(1000);
              attempt--;
              break;
          }
        }
        throw new Error("未能导航至游戏大厅");
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        console.log(TAG$1, "下一个步骤:", this.nextStepName);
        return this.nextStepName;
      }
    }, {
      key: "detectState",
      value: function detectState() {
        var img = ScreenHelper.tryCapture();
        if (img) {
          try {
            var region = getConfig().system.game.announce.region;
            var clipped = images.clip(img, region.x, region.y, region.w, region.h);
            images.save(clipped, "/sdcard/announce.png");
            if (OcrHelper.hasText(getConfig().system.game.announce, img)) {
              Logger.info(TAG$1, "检测到公告弹窗");
              return AppState.ANNOUNCE;
            }
            if (OcrHelper.hasText(getConfig().system.game.enterGame, img)) {
              Logger.info(TAG$1, "检测到登录页进入游戏按钮");
              return AppState.LOGIN;
            }
            var result = ScreenHelper.findMultiColorsInImg(img, getConfig().system.game.lobbyColor);
            if (result) {
              Logger.info(TAG$1, "检测到大厅底部主tab已选中");
              return AppState.LOBBY_CONFIRMED;
            }
            if (OcrHelper.hasText(getConfig().system.game.lobby, img)) {
              Logger.info(TAG$1, "检测到大厅底部商城按钮");
              return AppState.LOBBY;
            }
          } finally {
            recycleImage(img);
          }
        }
        if (currentPackage() === getConfig().system.game.packageName) {
          Logger.info(TAG$1, "检测到子页面");
          return AppState.IN_APP;
        }
        Logger.info(TAG$1, "未检测到状态");
        return AppState.UNKNOWN;
      }
    }]);
  }(Step);
  function isLobbyConfirmed() {
    var img = ScreenHelper.tryCapture();
    if (img) {
      try {
        var result = ScreenHelper.findMultiColorsInImg(img, getConfig().system.game.lobbyColor);
        return result !== null;
      } finally {
        recycleImage(img);
      }
    }
    return false;
  }
  function createBaseSteps() {
    var gameHomeNextStep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : STEP_END;
    var dualAppMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DualAppMode.NONE;
    var gameHome = new GameHome();
    gameHome.nextStepName = gameHomeNextStep;
    return {
      LaunchApp: new LaunchApp(),
      HandleDualApp: new HandleDualApp(dualAppMode),
      CloseAnnounce: new CloseAnnounce(),
      EnterGame: new EnterGame(),
      NavigateToLobby: new NavigateToLobby(),
      GameHome: gameHome,
      GoHomePage: new GoHomePage()
    };
  }

  var PermissionHelper = /*#__PURE__*/function () {
    function PermissionHelper() {
      _classCallCheck(this, PermissionHelper);
    }
    return _createClass(PermissionHelper, null, [{
      key: "isAccessibilityReady",
      get: function get() {
        return PermissionHelper._accessibilityReady;
      }
    }, {
      key: "isCaptureReady",
      get: function get() {
        return PermissionHelper._captureReady;
      }
    }, {
      key: "isOverlayReady",
      get: function get() {
        return PermissionHelper._overlayReady;
      }
    }, {
      key: "waitForAccessibility",
      value: function waitForAccessibility() {
        try {
          auto.waitFor();
          PermissionHelper._accessibilityReady = true;
          return true;
        } catch (_a) {
          return false;
        }
      }
    }, {
      key: "requestScreenCapture",
      value: function (_requestScreenCapture) {
        function requestScreenCapture() {
          return _requestScreenCapture.apply(this, arguments);
        }
        requestScreenCapture.toString = function () {
          return _requestScreenCapture.toString();
        };
        return requestScreenCapture;
      }(function () {
        var landscape = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        if (PermissionHelper._captureReady) return true;
        if (device.sdkInt > 28) {
          threads.start(function () {
            packageName("com.android.systemui").text("立即开始").waitFor();
            text("立即开始").click();
          });
          sleep(1000);
        }
        var result = requestScreenCapture(landscape);
        if (result) {
          PermissionHelper._captureReady = true;
          ScreenHelper.markCaptureReady();
        }
        return result;
      })
    }, {
      key: "requestOverlay",
      value: function requestOverlay() {
        if (PermissionHelper._overlayReady) return true;
        if (floaty.checkPermission()) {
          PermissionHelper._overlayReady = true;
          return true;
        }
        floaty.requestPermission();
        sleep(1000);
        if (floaty.checkPermission()) {
          PermissionHelper._overlayReady = true;
          return true;
        }
        return false;
      }
    }, {
      key: "requestRuntimePermissions",
      value: function requestRuntimePermissions(permissions) {
        runtime.requestPermissions(permissions);
      }
    }, {
      key: "requestAll",
      value: function requestAll() {
        if (!PermissionHelper.waitForAccessibility()) {
          toastLog("无障碍服务未开启");
          return false;
        }
        if (!PermissionHelper.requestScreenCapture()) {
          toastLog("截图权限获取失败");
          return false;
        }
        return true;
      }
    }, {
      key: "ensureAccessibility",
      value: function ensureAccessibility() {
        if (!PermissionHelper._accessibilityReady) {
          PermissionHelper.waitForAccessibility();
        }
      }
    }, {
      key: "ensureCapture",
      value: function ensureCapture() {
        if (!PermissionHelper._captureReady) {
          PermissionHelper.requestScreenCapture();
        }
      }
    }]);
  }();
  PermissionHelper._accessibilityReady = false;
  PermissionHelper._captureReady = false;
  PermissionHelper._overlayReady = false;
  function packageName(pkg) {
    return selector().id(pkg);
  }

  var TAG = "BaseTask";
  var BaseTask = /*#__PURE__*/function () {
    function BaseTask() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, BaseTask);
      this.name = "";
      this.firstStep = "";
      this.packageName = "com.bwxrk.yqmy.ty4";
      this.skipHomeCheck = false;
      this.steps = {};
      this.launchSteps = createBaseSteps();
      var businessSteps = config.businessSteps,
        dualAppMode = config.dualAppMode,
        rest = __rest(config, ["businessSteps", "dualAppMode"]);
      Object.assign(this, rest);
      if (dualAppMode) {
        this.launchSteps = createBaseSteps(STEP_END, dualAppMode);
      }
      if (businessSteps) {
        this.steps = businessSteps;
        if (!this.firstStep) {
          this.firstStep = Object.keys(businessSteps)[0] || "";
        }
      }
      if (Object.keys(this.steps).length === 0 && this.launchSteps) {
        this.steps = this.launchSteps;
        if (!this.firstStep) {
          this.firstStep = Object.keys(this.launchSteps)[0] || "";
        }
      }
    }
    /**
     * 执行启动步骤（launchSteps）
     *
     * 从 launchSteps 的第一个步骤开始顺序执行，最后验证是否回到主页。
     * 典型场景：任务开始前不在游戏主页、异常恢复需要重启应用。
     */
    return _createClass(BaseTask, [{
      key: "executeLaunchSteps",
      value: function executeLaunchSteps(ctx) {
        if (!this.launchSteps) return false;
        try {
          var current = Object.keys(this.launchSteps)[0] || "LaunchApp";
          while (current !== STEP_END) {
            var step = this.launchSteps[current];
            if (!step) break;
            step.taskRef = this;
            var next = step.execute(ctx, this);
            current = next;
          }
          return this.goHome();
        } catch (e) {
          guardScriptInterrupt(e);
          Logger.error(TAG, "\u542F\u52A8\u6B65\u9AA4\u6267\u884C\u5931\u8D25: ".concat(e));
          return false;
        }
      }
      /**
       * 三级恢复策略
       *
       * 依次尝试：
       *   1. step.recover() — 步骤自身恢复逻辑
       *   2. task.goHome()  — 回到游戏主页
       *   3. executeLaunchSteps() — 完整重启应用
       */
    }, {
      key: "recoverFromStep",
      value: function recoverFromStep(ctx, step) {
        var recovered = false;
        // 第一级：步骤自身恢复（step 为 null 时跳过）
        if (step) {
          try {
            recovered = step.recover(ctx, this);
          } catch (e) {
            guardScriptInterrupt(e);
            recovered = false;
          }
        }
        // 第二级：回到主页
        if (!recovered) recovered = this.goHome();
        // 第三级：关闭应用 + 重新启动
        if (!recovered) {
          this.forceStopApp();
          recovered = this.executeLaunchSteps(ctx);
        }
        return recovered;
      }
      /**
       * 强制关闭目标应用
       *
       * 三级恢复策略中使用，在重新启动应用前先强制关闭，
       * 确保应用不会卡在异常页面。
       */
    }, {
      key: "forceStopApp",
      value: function forceStopApp() {
        Logger.info(TAG, "\u5F3A\u5236\u5173\u95ED\u5E94\u7528: ".concat(this.packageName));
        try {
          shell("am force-stop ".concat(this.packageName), true);
          sleep(2000);
        } catch (e) {
          guardScriptInterrupt(e);
          Logger.error(TAG, "\u5173\u95ED\u5E94\u7528\u5931\u8D25: ".concat(e));
        }
      }
      /**
       * 执行任务的步骤循环
       *
       * 完整生命周期：
       *   暂停处理 → 主页检查 → 步骤执行 → 步骤跳转 → 异常恢复
       *
       * 循环条件（三者同时满足才继续）：
       *   - current !== STEP_END  — 步骤尚未走完
       *   - recoveryCount <= MAX_RECOVERY  — 恢复次数未超限
       *   - control.isActive()  — 引擎未被停止
       */
    }, {
      key: "run",
      value: function run(ctx, startStep, control) {
        // 注入 taskRef 到每个 Step 实例
        for (var key in this.steps) {
          this.steps[key].taskRef = this;
        }
        if (this.launchSteps) {
          for (var _key in this.launchSteps) {
            this.launchSteps[_key].taskRef = this;
          }
        }
        var current = startStep || this.firstStep;
        var recoveryCount = 0;
        var MAX_RECOVERY = 2;
        var exitReason = "";
        Logger.info(TAG, "[".concat(this.name, "] \u8D77\u59CB: ").concat(current));
        while (current !== STEP_END && recoveryCount <= MAX_RECOVERY) {
          // 引擎已停止则退出
          if (control && !control.isActive()) break;
          // ---- 暂停处理 ----
          if (control && control.isPaused()) {
            var _stepObj = this.steps[current] || this.steps[this.firstStep];
            if (_stepObj) _stepObj.onPause(ctx, this);
            while (control.isPaused() && control.isActive()) {
              sleep(500);
            }
            if (_stepObj) _stepObj.onResume(ctx, this);
            if (!control.isActive()) {
              exitReason = "引擎已停止";
              break;
            }
          }
          // ---- 步骤查找 ----
          var stepObj = this.steps[current];
          if (!stepObj) {
            toastLog("\u672A\u5B9A\u4E49\u6B65\u9AA4: ".concat(current));
            exitReason = "\u672A\u5B9A\u4E49\u6B65\u9AA4: ".concat(current);
            break;
          }
          // ---- 首步骤主页检查 ----
          if (current === this.firstStep && !this.skipHomeCheck) {
            var onHome = this.goHome();
            if (!onHome) {
              Logger.info(TAG, "不在主界面，执行启动流程...");
              var recovered = this.recoverFromStep(ctx, stepObj);
              if (recovered) {
                current = this.firstStep;
                recoveryCount++;
                continue;
              } else {
                toastLog("无法回到主界面，停止");
                exitReason = "\u6B65\u9AA4 ".concat(current, " \u542F\u52A8\u524D\u65E0\u6CD5\u56DE\u5230\u4E3B\u754C\u9762");
                break;
              }
            }
          }
          // ---- 执行步骤 ----
          var nextStep = void 0;
          try {
            nextStep = stepObj.execute(ctx, this);
          } catch (e) {
            guardScriptInterrupt(e);
            Logger.error(TAG, "\u6B65\u9AA4\u5F02\u5E38: ".concat(e));
            var _recovered = this.recoverFromStep(ctx, stepObj);
            if (_recovered) {
              current = this.firstStep;
              recoveryCount++;
              continue;
            } else {
              toastLog("多次恢复失败，停止");
              exitReason = "\u6B65\u9AA4 ".concat(current, " \u6267\u884C\u5F02\u5E38(").concat(e, ")\uFF0C\u6062\u590D").concat(recoveryCount, "\u6B21\u540E\u4ECD\u5931\u8D25");
              break;
            }
          }
          // ---- 步骤跳转 ----
          if (nextStep === "RECOVER") {
            try {
              stepObj.recover(ctx, this);
            } catch (e) {
              guardScriptInterrupt(e);
            }
            current = this.firstStep;
            recoveryCount++;
          } else {
            current = nextStep;
          }
        }
        var success = current === STEP_END;
        if (success) {
          this.goHome();
        }
        Logger.info(TAG, "[".concat(this.name, "] \u6D41\u7A0B").concat(success ? "完成" : "异常退出: " + exitReason));
        return success;
      }
    }, {
      key: "homeIndicator",
      value: function homeIndicator() {
        try {
          var img = ScreenHelper.tryCapture();
          if (img) {
            try {
              var result = ScreenHelper.findMultiColorsInImg(img, getConfig().system.game.lobbyColor);
              return result !== null;
            } finally {
              recycleImage(img);
            }
          }
          return false;
        } catch (e) {
          guardScriptInterrupt(e);
          return false;
        }
      }
    }, {
      key: "goHome",
      value: function goHome() {
        if (this.homeIndicator()) {
          Logger.info(TAG, "已在主页，无需返回");
          return true;
        }
        Logger.info(TAG, "任务结束，返回主页...");
        try {
          for (var i = 0; i < 10; i++) {
            var match = ScreenHelper.findMultiColors(getConfig().system.game.backBtnColor);
            if (match) {
              Logger.info(TAG, "检测到返回按钮，点击返回");
              ClickHelper.tap(match.x, match.y);
            } else {
              back();
            }
            sleep(800);
            if (this.homeIndicator()) {
              Logger.info(TAG, "已返回主页");
              return true;
            }
          }
        } catch (e) {
          guardScriptInterrupt(e);
        }
        Logger.error(TAG, "返回主页失败");
        return false;
      }
    }]);
  }();

  function createLaunchGameTask() {
    var dualAppMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DualAppMode.NONE;
    return new BaseTask({
      name: "启动进游戏",
      skipHomeCheck: true,
      dualAppMode: dualAppMode
    });
  }

  var ArenaState;
  (function (ArenaState) {
    ArenaState[ArenaState["UNKNOWN"] = 0] = "UNKNOWN";
    ArenaState[ArenaState["ARENA_SOLO"] = 1] = "ARENA_SOLO";
    ArenaState[ArenaState["ARENA_OTHER"] = 2] = "ARENA_OTHER";
    ArenaState[ArenaState["NOT_ARENA"] = 3] = "NOT_ARENA";
  })(ArenaState || (ArenaState = {}));
  var OpenArena = /*#__PURE__*/function (_Step) {
    function OpenArena(runState) {
      var _this;
      _classCallCheck(this, OpenArena);
      _this = _callSuper(this, OpenArena);
      _this.runState = runState;
      _this.name = "打开竞技对决";
      _this.confirmAttempts = 10;
      return _this;
    }
    _inherits(OpenArena, _Step);
    return _createClass(OpenArena, [{
      key: "canSkip",
      value: function canSkip(_ctx, _task) {
        return this.runState.currentRound > 0;
      }
    }, {
      key: "action",
      value: function action(_ctx, _task) {
        ClickHelper.tap(getConfig().dungeon.arena.arenaEntryPos.x, getConfig().dungeon.arena.arenaEntryPos.y);
        sleep(500);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return OcrHelper.hasText(getConfig().dungeon.arena.arena);
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(_ctx) {
        this.runState.currentRound = 1;
        return SelectSoloMode.name;
      }
    }]);
  }(Step);
  var SelectSoloMode = /*#__PURE__*/function (_Step2) {
    function SelectSoloMode() {
      var _this2;
      _classCallCheck(this, SelectSoloMode);
      _this2 = _callSuper(this, SelectSoloMode, arguments);
      _this2.name = "选择单人模式";
      _this2.confirmAttempts = 10;
      _this2.nextStepName = Matching.name;
      return _this2;
    }
    _inherits(SelectSoloMode, _Step2);
    return _createClass(SelectSoloMode, [{
      key: "action",
      value: function action(_ctx, _task) {
        var attempt = getConfig().dungeon.arena.maxNavigateAttempts;
        var lastState = ArenaState.UNKNOWN;
        while (attempt > 0) {
          var state = this.detectArenaState();
          if (state === lastState) {
            attempt--;
            sleep(1000);
            continue;
          }
          lastState = state;
          switch (state) {
            case ArenaState.ARENA_SOLO:
              Logger.info(this.tag, "检测到快速匹配按钮，点击");
              var match = OcrHelper.findText(getConfig().dungeon.arena.quickMatch);
              if (match) {
                ClickHelper.tapCenter(match.bounds);
              }
              this.nextStepName = Matching.name;
              return;
            case ArenaState.ARENA_OTHER:
              Logger.info(this.tag, "在竞技对决页但非单人模式，返回");
              back();
              sleep(500);
              break;
            case ArenaState.NOT_ARENA:
              Logger.info(this.tag, "不在竞技对决页，需要恢复");
              throw new Error("不在竞技对决页，需要恢复");
            default:
              Logger.info(this.tag, "未检测到状态，重试...");
              sleep(1000);
              attempt--;
              break;
          }
        }
        throw new Error("未能导航至单人匹配模式");
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(_ctx) {
        return this.nextStepName;
      }
    }, {
      key: "detectArenaState",
      value: function detectArenaState() {
        var img = ScreenHelper.tryCapture();
        if (img) {
          try {
            if (OcrHelper.hasText(getConfig().dungeon.arena.quickMatch, img)) {
              Logger.info(this.tag, "检测到快速匹配按钮");
              return ArenaState.ARENA_SOLO;
            }
            if (OcrHelper.hasText(getConfig().dungeon.arena.arena, img)) {
              Logger.info(this.tag, "检测到竞技对决页面");
              return ArenaState.ARENA_OTHER;
            }
          } finally {
            recycleImage(img);
          }
        }
        Logger.info(this.tag, "未检测到竞技对决相关内容");
        return ArenaState.NOT_ARENA;
      }
    }]);
  }(Step);
  var Matching = /*#__PURE__*/function (_Step3) {
    function Matching() {
      var _this3;
      _classCallCheck(this, Matching);
      _this3 = _callSuper(this, Matching, arguments);
      _this3.name = "匹配中";
      _this3.nextStepName = InGame.name;
      return _this3;
    }
    _inherits(Matching, _Step3);
    return _createClass(Matching, [{
      key: "action",
      value: function action(_ctx, _task) {
        this.nextStepName = InGame.name;
        var startTime = Date.now();
        while (Date.now() - startTime < getConfig().dungeon.arena.matchTimeout) {
          var img = ScreenHelper.tryCapture();
          if (img) {
            try {
              if (OcrHelper.hasText(getConfig().dungeon.arena.refresh, img)) {
                Logger.info(this.tag, "匹配成功，检测到刷新");
                this.nextStepName = InGame.name;
                return;
              }
              if (!OcrHelper.hasText(getConfig().dungeon.arena.cancelMatch, img)) {
                Logger.error(this.tag, "匹配被意外取消（可能网络异常）");
                throw new Error("匹配被意外取消");
              }
            } finally {
              recycleImage(img);
            }
          }
          sleep(5000);
        }
        Logger.info(this.tag, "匹配超时，取消匹配");
        var cancelMatch = OcrHelper.findText(getConfig().dungeon.arena.cancelMatch);
        if (cancelMatch) {
          ClickHelper.tapCenter(cancelMatch.bounds);
        }
        this.nextStepName = SelectSoloMode.name;
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(_ctx) {
        return this.nextStepName;
      }
    }]);
  }(Step);
  var InGame = /*#__PURE__*/function (_Step4) {
    function InGame() {
      var _this4;
      _classCallCheck(this, InGame);
      _this4 = _callSuper(this, InGame, arguments);
      _this4.name = "游戏中";
      return _this4;
    }
    _inherits(InGame, _Step4);
    return _createClass(InGame, [{
      key: "action",
      value: function action(_ctx, _task) {
        while (true) {
          if (OcrHelper.hasText(getConfig().dungeon.arena.eliminated) || OcrHelper.hasText(getConfig().dungeon.arena.winner)) {
            Logger.info(this.tag, "游戏结束");
            return;
          }
          sleep(3000);
        }
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(_ctx) {
        return BackToArena.name;
      }
    }]);
  }(Step);
  var BackToArena = /*#__PURE__*/function (_Step5) {
    function BackToArena(runState) {
      var _this5;
      _classCallCheck(this, BackToArena);
      _this5 = _callSuper(this, BackToArena);
      _this5.runState = runState;
      _this5.name = "返回竞技对决主页";
      _this5.confirmAttempts = 10;
      return _this5;
    }
    _inherits(BackToArena, _Step5);
    return _createClass(BackToArena, [{
      key: "action",
      value: function action(_ctx, _task) {
        for (var i = 0; i < 3; i++) {
          back();
          sleep(500);
        }
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return OcrHelper.hasText(getConfig().dungeon.arena.arena);
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(_ctx) {
        this.runState.currentRound++;
        if (this.runState.currentRound <= this.runState.totalRuns) {
          return SelectSoloMode.name;
        }
        return STEP_END;
      }
    }]);
  }(Step);
  var ArenaTask = /*#__PURE__*/function (_BaseTask) {
    function ArenaTask() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _classCallCheck(this, ArenaTask);
      var totalRuns = config.totalRuns || 1;
      var runState = {
        totalRuns: totalRuns,
        currentRound: 0
      };
      return _callSuper(this, ArenaTask, [{
        name: "单人匹配",
        businessSteps: {
          OpenArena: new OpenArena(runState),
          SelectSoloMode: new SelectSoloMode(),
          Matching: new Matching(),
          InGame: new InGame(),
          BackToArena: new BackToArena(runState)
        }
      }]);
    }
    _inherits(ArenaTask, _BaseTask);
    return _createClass(ArenaTask);
  }(BaseTask);
  function createArenaTask() {
    var totalRuns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    return new ArenaTask({
      totalRuns: totalRuns
    });
  }

  var ClickPlayTab = /*#__PURE__*/function (_Step) {
    function ClickPlayTab() {
      var _this;
      _classCallCheck(this, ClickPlayTab);
      _this = _callSuper(this, ClickPlayTab, arguments);
      _this.name = "点击玩法tab";
      _this.confirmAttempts = 10;
      return _this;
    }
    _inherits(ClickPlayTab, _Step);
    return _createClass(ClickPlayTab, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().system.playTab.playTabPos.x, getConfig().system.playTab.playTabPos.y);
        sleep(500);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return ScreenHelper.findMultiColors(getConfig().system.playTab.playTabOpened) !== null;
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return ScrollToTop.name;
      }
    }]);
  }(Step);
  var ScrollToTop = /*#__PURE__*/function (_Step2) {
    function ScrollToTop(nextStepName) {
      var _this2;
      _classCallCheck(this, ScrollToTop);
      _this2 = _callSuper(this, ScrollToTop);
      _this2.name = "滑动到顶部";
      _this2.nextStepName = nextStepName;
      return _this2;
    }
    _inherits(ScrollToTop, _Step2);
    return _createClass(ScrollToTop, [{
      key: "action",
      value: function action(ctx, task) {
        var retries = 0;
        while (!OcrHelper.hasText(getConfig().system.scroll.dailyDungeonText)) {
          if (retries >= getConfig().system.scroll.maxScrollRetries) {
            Logger.error(this.tag, "未找到日常副本，放弃滑动");
            return;
          }
          var scroll = getConfig().system.scroll;
          ScreenHelper.swipe(scroll.swipeStartPos.x, scroll.swipeStartPos.y, scroll.swipeEndPos.x, scroll.swipeEndPos.y, 100);
          sleep(1000);
          retries++;
        }
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return this.nextStepName;
      }
    }]);
  }(Step);

  var ClickDailyDungeon = /*#__PURE__*/function (_Step) {
    function ClickDailyDungeon() {
      var _this;
      _classCallCheck(this, ClickDailyDungeon);
      _this = _callSuper(this, ClickDailyDungeon, arguments);
      _this.name = "点击日常副本";
      _this.confirmAttempts = 10;
      return _this;
    }
    _inherits(ClickDailyDungeon, _Step);
    return _createClass(ClickDailyDungeon, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().dungeon.dungeon.dailyDungeonPos.x, getConfig().dungeon.dungeon.dailyDungeonPos.y);
        sleep(500);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return OcrHelper.hasText(getConfig().dungeon.dungeon.goldText);
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return GoldExplore.name;
      }
    }]);
  }(Step);
  var GoldExplore = /*#__PURE__*/function (_Step2) {
    function GoldExplore() {
      var _this2;
      _classCallCheck(this, GoldExplore);
      _this2 = _callSuper(this, GoldExplore, arguments);
      _this2.name = "金币探索";
      return _this2;
    }
    _inherits(GoldExplore, _Step2);
    return _createClass(GoldExplore, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().dungeon.dungeon.goldExplorePos.x, getConfig().dungeon.dungeon.goldExplorePos.y);
        sleep(500);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return GoldSweep.name;
      }
    }]);
  }(Step);
  var GoldSweep = /*#__PURE__*/function (_Step3) {
    function GoldSweep() {
      var _this3;
      _classCallCheck(this, GoldSweep);
      _this3 = _callSuper(this, GoldSweep, arguments);
      _this3.name = "金币扫荡";
      return _this3;
    }
    _inherits(GoldSweep, _Step3);
    return _createClass(GoldSweep, [{
      key: "action",
      value: function action(ctx, task) {
        for (var i = 0; i < 6; i++) {
          ClickHelper.tap(getConfig().dungeon.dungeon.goldSweepPos.x, getConfig().dungeon.dungeon.goldSweepPos.y);
          sleep(1000);
        }
        sleep(2000);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return MaterialExplore.name;
      }
    }]);
  }(Step);
  var MaterialExplore = /*#__PURE__*/function (_Step4) {
    function MaterialExplore() {
      var _this4;
      _classCallCheck(this, MaterialExplore);
      _this4 = _callSuper(this, MaterialExplore, arguments);
      _this4.name = "材料搜寻";
      return _this4;
    }
    _inherits(MaterialExplore, _Step4);
    return _createClass(MaterialExplore, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().dungeon.dungeon.materialExplorePos.x, getConfig().dungeon.dungeon.materialExplorePos.y);
        sleep(500);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return MaterialSweep.name;
      }
    }]);
  }(Step);
  var MaterialSweep = /*#__PURE__*/function (_Step5) {
    function MaterialSweep() {
      var _this5;
      _classCallCheck(this, MaterialSweep);
      _this5 = _callSuper(this, MaterialSweep, arguments);
      _this5.name = "材料扫荡";
      return _this5;
    }
    _inherits(MaterialSweep, _Step5);
    return _createClass(MaterialSweep, [{
      key: "action",
      value: function action(ctx, task) {
        for (var i = 0; i < 6; i++) {
          ClickHelper.tap(getConfig().dungeon.dungeon.materialSweepPos.x, getConfig().dungeon.dungeon.materialSweepPos.y);
          sleep(1000);
        }
        sleep(2000);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
    }]);
  }(Step);
  var dailyDungeonTask = new BaseTask({
    name: "日常副本",
    businessSteps: {
      ClickPlayTab: new ClickPlayTab(),
      ScrollToTop: new ScrollToTop(ClickDailyDungeon.name),
      ClickDailyDungeon: new ClickDailyDungeon(),
      GoldExplore: new GoldExplore(),
      GoldSweep: new GoldSweep(),
      MaterialExplore: new MaterialExplore(),
      MaterialSweep: new MaterialSweep()
    }
  });

  var ClickAbyssLord = /*#__PURE__*/function (_Step) {
    function ClickAbyssLord() {
      var _this;
      _classCallCheck(this, ClickAbyssLord);
      _this = _callSuper(this, ClickAbyssLord, arguments);
      _this.name = "点击深渊领主";
      _this.confirmAttempts = 10;
      return _this;
    }
    _inherits(ClickAbyssLord, _Step);
    return _createClass(ClickAbyssLord, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().dungeon.abyss.abyssLordPos.x, getConfig().dungeon.abyss.abyssLordPos.y);
        sleep(1000);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return OcrHelper.hasText(getConfig().dungeon.abyss.abyssLordTitle);
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return SweepAbyssLord.name;
      }
    }]);
  }(Step); // 扫荡深渊领主
  var SweepAbyssLord = /*#__PURE__*/function (_Step2) {
    function SweepAbyssLord() {
      var _this2;
      _classCallCheck(this, SweepAbyssLord);
      _this2 = _callSuper(this, SweepAbyssLord, arguments);
      _this2.name = "扫荡深渊领主";
      _this2.confirmAttempts = 10;
      _this2.nextStepName = ConfirmSweepAbyssLord.name;
      return _this2;
    }
    _inherits(SweepAbyssLord, _Step2);
    return _createClass(SweepAbyssLord, [{
      key: "canSkip",
      value: function canSkip(ctx, task) {
        // 判断是否有扫荡按钮，并且次数大于0
        var img = ScreenHelper.tryCapture();
        if (!img) return false;
        try {
          // 没有扫荡按钮，或者次数为0，跳过扫荡步骤
          var hasSweepBtn = !OcrHelper.hasText(getConfig().dungeon.abyss.saoDangBtn, img) || OcrHelper.hasText(getConfig().dungeon.abyss.saoDangCount, img);
          Logger.info(this.tag, "\u662F\u5426\u8DF3\u8FC7\u626B\u8361\u6B65\u9AA4: ".concat(hasSweepBtn));
          this.nextStepName = hasSweepBtn ? STEP_END : ConfirmSweepAbyssLord.name;
          return hasSweepBtn;
        } finally {
          recycleImage(img);
        }
      }
    }, {
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().dungeon.abyss.saoDangPos.x, getConfig().dungeon.abyss.saoDangPos.y);
        sleep(1000);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return this.nextStepName;
      }
    }]);
  }(Step);
  /**
   * 确认扫荡
   */
  var ConfirmSweepAbyssLord = /*#__PURE__*/function (_Step3) {
    function ConfirmSweepAbyssLord() {
      var _this3;
      _classCallCheck(this, ConfirmSweepAbyssLord);
      _this3 = _callSuper(this, ConfirmSweepAbyssLord, arguments);
      _this3.name = "确认扫荡深渊领主";
      _this3.confirmAttempts = 10;
      return _this3;
    }
    _inherits(ConfirmSweepAbyssLord, _Step3);
    return _createClass(ConfirmSweepAbyssLord, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().dungeon.abyss.confirmSweepPos.x, getConfig().dungeon.abyss.confirmSweepPos.y);
        sleep(1000);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return OcrHelper.hasText(getConfig().dungeon.abyss.settleBtn);
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return SettleAbyssLord.name;
      }
    }]);
  }(Step);
  /**
   * {x:425,y:2092,w:230,h:98}
   *
   * 挑战结束，结算
   */
  var SettleAbyssLord = /*#__PURE__*/function (_Step4) {
    function SettleAbyssLord() {
      var _this4;
      _classCallCheck(this, SettleAbyssLord);
      _this4 = _callSuper(this, SettleAbyssLord, arguments);
      _this4.name = "结算深渊领主";
      _this4.confirmAttempts = 10;
      return _this4;
    }
    _inherits(SettleAbyssLord, _Step4);
    return _createClass(SettleAbyssLord, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().dungeon.abyss.settlePos.x, getConfig().dungeon.abyss.settlePos.y);
        sleep(1000);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return STEP_END;
      }
    }]);
  }(Step);
  var abyssLordTask = new BaseTask({
    name: "深渊领主",
    businessSteps: {
      ClickPlayTab: new ClickPlayTab(),
      ScrollToTop: new ScrollToTop(ClickAbyssLord.name),
      ClickAbyssLord: new ClickAbyssLord(),
      SweepAbyssLord: new SweepAbyssLord(),
      ConfirmSweepAbyssLord: new ConfirmSweepAbyssLord(),
      SettleAbyssLord: new SettleAbyssLord()
    }
  });

  /** 点击精英挑战 */
  var ClickEliteChallenge = /*#__PURE__*/function (_Step) {
    function ClickEliteChallenge() {
      var _this;
      _classCallCheck(this, ClickEliteChallenge);
      _this = _callSuper(this, ClickEliteChallenge, arguments);
      _this.name = "点击精英挑战";
      _this.confirmAttempts = 10;
      return _this;
    }
    _inherits(ClickEliteChallenge, _Step);
    return _createClass(ClickEliteChallenge, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().dungeon.elite.eliteChallengePos.x, getConfig().dungeon.elite.eliteChallengePos.y);
        sleep(500);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return OcrHelper.hasText(getConfig().dungeon.elite.eliteTitle);
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return ClickSweep$1.name;
      }
    }]);
  }(Step);
  /** 点击扫荡 */
  var ClickSweep$1 = /*#__PURE__*/function (_Step2) {
    function ClickSweep() {
      var _this2;
      _classCallCheck(this, ClickSweep);
      _this2 = _callSuper(this, ClickSweep, arguments);
      _this2.name = "点击扫荡";
      _this2.confirmAttempts = 10;
      return _this2;
    }
    _inherits(ClickSweep, _Step2);
    return _createClass(ClickSweep, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().dungeon.elite.sweepPos.x, getConfig().dungeon.elite.sweepPos.y);
        sleep(500);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return OcrHelper.hasText(getConfig().dungeon.elite.sweepText);
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return CheckLimitReached.name;
      }
    }]);
  }(Step);
  /** 检测已达上限和确认扫荡 */
  var CheckLimitReached = /*#__PURE__*/function (_Step3) {
    function CheckLimitReached() {
      var _this3;
      _classCallCheck(this, CheckLimitReached);
      _this3 = _callSuper(this, CheckLimitReached, arguments);
      _this3.name = "检测已达上限";
      _this3.nextStepName = CloseSweepWindow.name;
      return _this3;
    }
    _inherits(CheckLimitReached, _Step3);
    return _createClass(CheckLimitReached, [{
      key: "canSkip",
      value: function canSkip(ctx, task) {
        // 检查是否已达上限
        return OcrHelper.hasText(getConfig().dungeon.elite.limitReached);
      }
    }, {
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().dungeon.elite.confirmSweepPos.x, getConfig().dungeon.elite.confirmSweepPos.y);
        sleep(1000);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return CloseSweepWindow.name;
      }
    }]);
  }(Step);
  /** 关闭扫荡窗口 */
  var CloseSweepWindow = /*#__PURE__*/function (_Step4) {
    function CloseSweepWindow() {
      var _this4;
      _classCallCheck(this, CloseSweepWindow);
      _this4 = _callSuper(this, CloseSweepWindow, arguments);
      _this4.name = "关闭扫荡窗口";
      return _this4;
    }
    _inherits(CloseSweepWindow, _Step4);
    return _createClass(CloseSweepWindow, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().dungeon.elite.closeSweepPos.x, getConfig().dungeon.elite.closeSweepPos.y);
        sleep(500);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
    }]);
  }(Step);
  var eliteChallengeTask = new BaseTask({
    name: "精英挑战",
    businessSteps: {
      ClickPlayTab: new ClickPlayTab(),
      ScrollToTop: new ScrollToTop(ClickEliteChallenge.name),
      ClickEliteChallenge: new ClickEliteChallenge(),
      ClickSweep: new ClickSweep$1(),
      CheckLimitReached: new CheckLimitReached(),
      CloseSweepWindow: new CloseSweepWindow()
    }
  });

  var ClickTrialLand = /*#__PURE__*/function (_Step) {
    function ClickTrialLand() {
      var _this;
      _classCallCheck(this, ClickTrialLand);
      _this = _callSuper(this, ClickTrialLand, arguments);
      _this.name = "点击试炼之地";
      _this.confirmAttempts = 10;
      return _this;
    }
    _inherits(ClickTrialLand, _Step);
    return _createClass(ClickTrialLand, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().dungeon.trial.trialLandPos.x, getConfig().dungeon.trial.trialLandPos.y);
        sleep(500);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return OcrHelper.hasText(getConfig().dungeon.trial.sweepText);
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return ClickSweep.name;
      }
    }]);
  }(Step);
  var ClickSweep = /*#__PURE__*/function (_Step2) {
    function ClickSweep() {
      var _this2;
      _classCallCheck(this, ClickSweep);
      _this2 = _callSuper(this, ClickSweep, arguments);
      _this2.name = "扫荡";
      return _this2;
    }
    _inherits(ClickSweep, _Step2);
    return _createClass(ClickSweep, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().dungeon.trial.sweepPos.x, getConfig().dungeon.trial.sweepPos.y);
        sleep(500);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return ClickFreeSweep.name;
      }
    }]);
  }(Step);
  var ClickFreeSweep = /*#__PURE__*/function (_Step3) {
    function ClickFreeSweep() {
      var _this3;
      _classCallCheck(this, ClickFreeSweep);
      _this3 = _callSuper(this, ClickFreeSweep, arguments);
      _this3.name = "免费扫荡";
      return _this3;
    }
    _inherits(ClickFreeSweep, _Step3);
    return _createClass(ClickFreeSweep, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().dungeon.trial.freeSweepPos.x, getConfig().dungeon.trial.freeSweepPos.y);
        sleep(500);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return OcrHelper.hasText(getConfig().dungeon.trial.limitReached);
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return BackToPlay.name;
      }
    }]);
  }(Step);
  var BackToPlay = /*#__PURE__*/function (_Step4) {
    function BackToPlay() {
      var _this4;
      _classCallCheck(this, BackToPlay);
      _this4 = _callSuper(this, BackToPlay, arguments);
      _this4.name = "返回玩法";
      return _this4;
    }
    _inherits(BackToPlay, _Step4);
    return _createClass(BackToPlay, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().dungeon.trial.backToPlayPos.x, getConfig().dungeon.trial.backToPlayPos.y);
        sleep(500);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
    }]);
  }(Step);
  var trialLandTask = new BaseTask({
    name: "试炼之地",
    businessSteps: {
      ClickPlayTab: new ClickPlayTab(),
      ScrollToTop: new ScrollToTop(ClickTrialLand.name),
      ClickTrialLand: new ClickTrialLand(),
      ClickSweep: new ClickSweep(),
      ClickFreeSweep: new ClickFreeSweep(),
      BackToPlay: new BackToPlay()
    }
  });

  var OpenGuild$1 = /*#__PURE__*/function (_Step) {
    function OpenGuild() {
      var _this;
      _classCallCheck(this, OpenGuild);
      _this = _callSuper(this, OpenGuild, arguments);
      _this.name = "打开工会";
      _this.confirmAttempts = 10;
      return _this;
    }
    _inherits(OpenGuild, _Step);
    return _createClass(OpenGuild, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().guild.hunt.guildTabPos.x, getConfig().guild.hunt.guildTabPos.y);
        sleep(1000);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return OcrHelper.hasText(getConfig().guild.hunt.guildHall);
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return EnterHunt.name;
      }
    }]);
  }(Step);
  var EnterHunt = /*#__PURE__*/function (_Step2) {
    function EnterHunt() {
      var _this2;
      _classCallCheck(this, EnterHunt);
      _this2 = _callSuper(this, EnterHunt, arguments);
      _this2.name = "进入猎魔入侵";
      _this2.confirmAttempts = 10;
      _this2.nextStepName = ClickChallenge.name;
      return _this2;
    }
    _inherits(EnterHunt, _Step2);
    return _createClass(EnterHunt, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().guild.hunt.huntEntryPos.x, getConfig().guild.hunt.huntEntryPos.y);
        sleep(500);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        var _this3 = this;
        return function () {
          var img = ScreenHelper.tryCapture();
          if (!img) return false;
          try {
            if (OcrHelper.hasText(getConfig().guild.hunt.dailySettle, img)) {
              Logger.info(_this3.tag, "检测到每日结算，无需操作");
              _this3.nextStepName = STEP_END;
              return true;
            }
            return OcrHelper.hasText(getConfig().guild.hunt.challenge, img);
          } finally {
            recycleImage(img);
          }
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return this.nextStepName;
      }
    }]);
  }(Step);
  var ClickChallenge = /*#__PURE__*/function (_Step3) {
    function ClickChallenge() {
      var _this4;
      _classCallCheck(this, ClickChallenge);
      _this4 = _callSuper(this, ClickChallenge, arguments);
      _this4.name = "点击挑战";
      _this4.confirmAttempts = 10;
      return _this4;
    }
    _inherits(ClickChallenge, _Step3);
    return _createClass(ClickChallenge, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().guild.hunt.challengePos.x, getConfig().guild.hunt.challengePos.y);
        sleep(500);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return OcrHelper.hasText(getConfig().guild.hunt.startChallenge);
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return CheckDeploy.name;
      }
    }]);
  }(Step);
  var CheckDeploy = /*#__PURE__*/function (_Step4) {
    function CheckDeploy() {
      var _this5;
      _classCallCheck(this, CheckDeploy);
      _this5 = _callSuper(this, CheckDeploy, arguments);
      _this5.name = "检查上阵状态";
      _this5.nextStepName = CheckPlantCount.name;
      return _this5;
    }
    _inherits(CheckDeploy, _Step4);
    return _createClass(CheckDeploy, [{
      key: "action",
      value: function action(ctx, task) {
        var img = ScreenHelper.tryCapture();
        if (!img) return;
        try {
          if (OcrHelper.hasText(getConfig().guild.hunt.undeployBtn, img)) {
            Logger.info(this.tag, "检测到一键下阵，点击下阵");
            ClickHelper.tap(getConfig().guild.hunt.autoDeployPos.x, getConfig().guild.hunt.autoDeployPos.y);
            sleep(1000);
            Logger.info(this.tag, "点击上阵");
            ClickHelper.tap(getConfig().guild.hunt.autoDeployPos.x, getConfig().guild.hunt.autoDeployPos.y);
            sleep(1000);
          } else if (OcrHelper.hasText(getConfig().guild.hunt.deployBtn, img)) {
            Logger.info(this.tag, "检测到一键上阵，点击上阵");
            ClickHelper.tap(getConfig().guild.hunt.autoDeployPos.x, getConfig().guild.hunt.autoDeployPos.y);
            sleep(1000);
          } else {
            Logger.info(this.tag, "未检测到上阵/下阵按钮");
          }
        } finally {
          recycleImage(img);
        }
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return this.nextStepName;
      }
    }]);
  }(Step);
  var CheckPlantCount = /*#__PURE__*/function (_Step5) {
    function CheckPlantCount() {
      var _this6;
      _classCallCheck(this, CheckPlantCount);
      _this6 = _callSuper(this, CheckPlantCount, arguments);
      _this6.name = "检查植物数量";
      _this6.nextStepName = StartChallenge.name;
      return _this6;
    }
    _inherits(CheckPlantCount, _Step5);
    return _createClass(CheckPlantCount, [{
      key: "action",
      value: function action(ctx, task) {
        var img = ScreenHelper.tryCapture();
        if (!img) return;
        try {
          var hasFullPlants = OcrHelper.hasTextExact(getConfig().guild.hunt.plantCount, img);
          if (hasFullPlants) {
            Logger.info(this.tag, "植物已满6/6，可以开始挑战");
            this.nextStepName = StartChallenge.name;
          } else {
            Logger.info(this.tag, "植物不足6/6，尝试复活退场植物");
            this.nextStepName = RevivePlants.name;
          }
        } finally {
          recycleImage(img);
        }
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return this.nextStepName;
      }
    }]);
  }(Step);
  var StartChallenge = /*#__PURE__*/function (_Step6) {
    function StartChallenge() {
      var _this7;
      _classCallCheck(this, StartChallenge);
      _this7 = _callSuper(this, StartChallenge, arguments);
      _this7.name = "开始挑战";
      _this7.confirmAttempts = 10;
      return _this7;
    }
    _inherits(StartChallenge, _Step6);
    return _createClass(StartChallenge, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().guild.hunt.startChallengePos.x, getConfig().guild.hunt.startChallengePos.y);
        sleep(3000);
        var ocrConfirm = OcrHelper.findText(getConfig().guild.hunt.confirmStartChallenge);
        if (ocrConfirm) {
          Logger.info(this.tag, "检测到确认开始挑战按钮");
          ClickHelper.tap(ocrConfirm.bounds.centerX(), ocrConfirm.bounds.centerY());
          sleep(2000);
        }
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return OcrHelper.hasText(getConfig().guild.hunt.autoReleaseSkill);
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return InBattle.name;
      }
    }]);
  }(Step);
  var InBattle = /*#__PURE__*/function (_Step7) {
    function InBattle() {
      var _this8;
      _classCallCheck(this, InBattle);
      _this8 = _callSuper(this, InBattle, arguments);
      _this8.name = "挑战中";
      return _this8;
    }
    _inherits(InBattle, _Step7);
    return _createClass(InBattle, [{
      key: "action",
      value: function action(ctx, task) {
        while (true) {
          if (OcrHelper.hasText(getConfig().guild.hunt.autoReleaseSkill)) {
            Logger.info(this.tag, "检测到自动释放技能");
          } else {
            Logger.info(this.tag, "未检测到自动释放技能，挑战结束");
            break;
          }
          sleep(10000);
        }
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return OcrHelper.hasText(getConfig().guild.hunt.challengeEnd);
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return BackToChallenge.name;
      }
    }]);
  }(Step);
  var BackToChallenge = /*#__PURE__*/function (_Step8) {
    function BackToChallenge() {
      var _this9;
      _classCallCheck(this, BackToChallenge);
      _this9 = _callSuper(this, BackToChallenge, arguments);
      _this9.name = "返回挑战页面";
      _this9.confirmAttempts = 10;
      return _this9;
    }
    _inherits(BackToChallenge, _Step8);
    return _createClass(BackToChallenge, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().guild.hunt.backToChallengePos.x, getConfig().guild.hunt.backToChallengePos.y);
        sleep(3000);
        Logger.error(this.tag, "返回挑战页面失败");
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return OcrHelper.hasText(getConfig().guild.hunt.challenge);
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return ClickChallenge.name;
      }
    }]);
  }(Step);
  var RevivePlants = /*#__PURE__*/function (_Step9) {
    function RevivePlants() {
      var _this0;
      _classCallCheck(this, RevivePlants);
      _this0 = _callSuper(this, RevivePlants, arguments);
      _this0.name = "复活退场植物";
      return _this0;
    }
    _inherits(RevivePlants, _Step9);
    return _createClass(RevivePlants, [{
      key: "action",
      value: function action(ctx, task) {
        var result = ScreenHelper.findMultiColors(getConfig().guild.hunt.reviveBtnColor);
        if (result) {
          Logger.info(this.tag, "复活按钮可点击，点击复活");
          ClickHelper.tap(result.x, result.y);
          sleep(1000);
        } else {
          Logger.info(this.tag, "复活按钮不可点击，没有可复活的植物");
        }
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return STEP_END;
      }
    }]);
  }(Step);
  var guildHuntTask = new BaseTask({
    name: "猎魔入侵",
    businessSteps: {
      OpenGuild: new OpenGuild$1(),
      EnterHunt: new EnterHunt(),
      ClickChallenge: new ClickChallenge(),
      CheckDeploy: new CheckDeploy(),
      CheckPlantCount: new CheckPlantCount(),
      StartChallenge: new StartChallenge(),
      InBattle: new InBattle(),
      BackToChallenge: new BackToChallenge(),
      RevivePlants: new RevivePlants()
    }
  });

  var OpenGuild = /*#__PURE__*/function (_Step) {
    function OpenGuild() {
      var _this;
      _classCallCheck(this, OpenGuild);
      _this = _callSuper(this, OpenGuild, arguments);
      _this.name = "打开工会";
      _this.confirmAttempts = 10;
      return _this;
    }
    _inherits(OpenGuild, _Step);
    return _createClass(OpenGuild, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().guild.donate.guildTabPos.x, getConfig().guild.donate.guildTabPos.y);
        sleep(1000);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return OcrHelper.hasText(getConfig().guild.donate.guildHall);
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return EnterDonate.name;
      }
    }]);
  }(Step);
  var EnterDonate = /*#__PURE__*/function (_Step2) {
    function EnterDonate() {
      var _this2;
      _classCallCheck(this, EnterDonate);
      _this2 = _callSuper(this, EnterDonate, arguments);
      _this2.name = "进入捐献页面";
      _this2.confirmAttempts = 10;
      return _this2;
    }
    _inherits(EnterDonate, _Step2);
    return _createClass(EnterDonate, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().guild.donate.donateEntryPos.x, getConfig().guild.donate.donateEntryPos.y);
        sleep(800);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return OcrHelper.hasText(getConfig().guild.donate.donateBtn);
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return ClickGoldDonate.name;
      }
    }]);
  }(Step);
  var ClickGoldDonate = /*#__PURE__*/function (_Step3) {
    function ClickGoldDonate() {
      var _this3;
      _classCallCheck(this, ClickGoldDonate);
      _this3 = _callSuper(this, ClickGoldDonate, arguments);
      _this3.name = "金币捐献";
      _this3.confirmAttempts = 10;
      _this3.nextStepName = STEP_END;
      return _this3;
    }
    _inherits(ClickGoldDonate, _Step3);
    return _createClass(ClickGoldDonate, [{
      key: "canSkip",
      value: function canSkip(ctx, task) {
        if (!ScreenHelper.findMultiColors(getConfig().guild.donate.donateBtnRedDot)) {
          Logger.info(this.tag, "未检测到捐献按钮红点,今日已捐献完成");
          this.nextStepName = STEP_END;
          return true;
        }
        return false;
      }
    }, {
      key: "action",
      value: function action(ctx, task) {
        var i = 0;
        while (i < 5) {
          ClickHelper.tap(getConfig().guild.donate.goldDonateBtnPos.x, getConfig().guild.donate.goldDonateBtnPos.y);
          sleep(500);
          ClickHelper.tap(getConfig().guild.donate.goldDonateBtnPos.x, getConfig().guild.donate.goldDonateBtnPos.y);
          sleep(500);
          if (!ScreenHelper.findMultiColors(getConfig().guild.donate.donateBtnRedDot)) {
            Logger.info(this.tag, "未检测到捐献按钮红点,今日已捐献完成");
            this.nextStepName = STEP_END;
            return;
          }
        }
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return this.nextStepName;
      }
    }]);
  }(Step);
  var guildDonateTask = new BaseTask({
    name: "工会捐献",
    businessSteps: {
      OpenGuild: new OpenGuild(),
      EnterDonate: new EnterDonate(),
      ClickGoldDonate: new ClickGoldDonate()
    }
  });

  var ClickChannelEntry = /*#__PURE__*/function (_Step) {
    function ClickChannelEntry() {
      var _this;
      _classCallCheck(this, ClickChannelEntry);
      _this = _callSuper(this, ClickChannelEntry, arguments);
      _this.name = "点击频道入口";
      _this.confirmTimeout = 5000;
      return _this;
    }
    _inherits(ClickChannelEntry, _Step);
    return _createClass(ClickChannelEntry, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().guild.chat.channelEntryPos.x, getConfig().guild.chat.channelEntryPos.y);
        sleep(500);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return ScreenHelper.findMultiColors(getConfig().guild.chat.channelOpened) !== null;
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return SelectGuildChannel.name;
      }
    }]);
  }(Step);
  var SelectGuildChannel = /*#__PURE__*/function (_Step2) {
    function SelectGuildChannel() {
      var _this2;
      _classCallCheck(this, SelectGuildChannel);
      _this2 = _callSuper(this, SelectGuildChannel, arguments);
      _this2.name = "选择工会频道";
      _this2.confirmAttempts = 10;
      return _this2;
    }
    _inherits(SelectGuildChannel, _Step2);
    return _createClass(SelectGuildChannel, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().guild.chat.guildChannelPos.x, getConfig().guild.chat.guildChannelPos.y);
        sleep(500);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return ScreenHelper.findMultiColors(getConfig().guild.chat.guildChannelSelected) !== null;
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return ClickInputBox.name;
      }
    }]);
  }(Step);
  var ClickInputBox = /*#__PURE__*/function (_Step3) {
    function ClickInputBox() {
      var _this3;
      _classCallCheck(this, ClickInputBox);
      _this3 = _callSuper(this, ClickInputBox, arguments);
      _this3.name = "点击输入框";
      return _this3;
    }
    _inherits(ClickInputBox, _Step3);
    return _createClass(ClickInputBox, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().guild.chat.inputBoxPos.x, getConfig().guild.chat.inputBoxPos.y);
        sleep(500);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return ClickEmoji.name;
      }
    }]);
  }(Step);
  var ClickEmoji = /*#__PURE__*/function (_Step4) {
    function ClickEmoji() {
      var _this4;
      _classCallCheck(this, ClickEmoji);
      _this4 = _callSuper(this, ClickEmoji, arguments);
      _this4.name = "点击表情";
      return _this4;
    }
    _inherits(ClickEmoji, _Step4);
    return _createClass(ClickEmoji, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().guild.chat.emojiPos.x, getConfig().guild.chat.emojiPos.y);
        sleep(500);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return ClickSend.name;
      }
    }]);
  }(Step);
  var ClickSend = /*#__PURE__*/function (_Step5) {
    function ClickSend() {
      var _this5;
      _classCallCheck(this, ClickSend);
      _this5 = _callSuper(this, ClickSend, arguments);
      _this5.name = "点击发送";
      _this5.confirmAttempts = 10;
      return _this5;
    }
    _inherits(ClickSend, _Step5);
    return _createClass(ClickSend, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().guild.chat.sendBtnPos.x, getConfig().guild.chat.sendBtnPos.y);
        sleep(1000);
        ClickHelper.tap(getConfig().guild.chat.sendBtnPos.x, getConfig().guild.chat.sendBtnPos.y);
        sleep(1500);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return OcrHelper.hasText(getConfig().guild.chat.inputPlaceholder);
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return CloseWindow.name;
      }
    }]);
  }(Step);
  var CloseWindow = /*#__PURE__*/function (_Step6) {
    function CloseWindow() {
      var _this6;
      _classCallCheck(this, CloseWindow);
      _this6 = _callSuper(this, CloseWindow, arguments);
      _this6.name = "关闭窗口";
      return _this6;
    }
    _inherits(CloseWindow, _Step6);
    return _createClass(CloseWindow, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().guild.chat.closeBtnPos.x, getConfig().guild.chat.closeBtnPos.y);
        sleep(500);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
    }]);
  }(Step);
  var guildChatTask = new BaseTask({
    name: "工会发言",
    businessSteps: {
      ClickChannelEntry: new ClickChannelEntry(),
      SelectGuildChannel: new SelectGuildChannel(),
      ClickInputBox: new ClickInputBox(),
      ClickEmoji: new ClickEmoji(),
      ClickSend: new ClickSend(),
      CloseWindow: new CloseWindow()
    }
  });

  var OpenManor = /*#__PURE__*/function (_Step) {
    function OpenManor() {
      var _this;
      _classCallCheck(this, OpenManor);
      _this = _callSuper(this, OpenManor, arguments);
      _this.name = "打开庄园";
      return _this;
    }
    _inherits(OpenManor, _Step);
    return _createClass(OpenManor, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().guild.assist.manorPos.x, getConfig().guild.assist.manorPos.y);
        sleep(500);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return ScreenHelper.findMultiColors(getConfig().guild.assist.manorOpened) !== null;
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return OpenNeighborPanel.name;
      }
    }]);
  }(Step);
  var OpenNeighborPanel = /*#__PURE__*/function (_Step2) {
    function OpenNeighborPanel() {
      var _this2;
      _classCallCheck(this, OpenNeighborPanel);
      _this2 = _callSuper(this, OpenNeighborPanel, arguments);
      _this2.name = "打开邻居面板";
      _this2.confirmAttempts = 10;
      return _this2;
    }
    _inherits(OpenNeighborPanel, _Step2);
    return _createClass(OpenNeighborPanel, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().guild.assist.neighborPanelPos.x, getConfig().guild.assist.neighborPanelPos.y);
        sleep(500);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return OcrHelper.hasText(getConfig().guild.assist.neighborPanel);
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return CheckAssistable.name;
      }
    }]);
  }(Step);
  var CheckAssistable = /*#__PURE__*/function (_Step3) {
    function CheckAssistable() {
      var _this3;
      _classCallCheck(this, CheckAssistable);
      _this3 = _callSuper(this, CheckAssistable, arguments);
      _this3.name = "可协助好友";
      _this3.nextStepName = ClickVisit.name;
      return _this3;
    }
    _inherits(CheckAssistable, _Step3);
    return _createClass(CheckAssistable, [{
      key: "action",
      value: function action(ctx, task) {
        var result = ScreenHelper.findMultiColors(getConfig().guild.assist.assistableColor);
        if (result) {
          Logger.info(this.tag, "检测到可协助好友，点击");
          ClickHelper.tap(result.x, result.y);
          sleep(1000);
        } else {
          Logger.info(this.tag, "无可协助好友，协助结束");
          this.nextStepName = STEP_END;
        }
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return this.nextStepName;
      }
    }]);
  }(Step);
  var ClickVisit = /*#__PURE__*/function (_Step4) {
    function ClickVisit() {
      var _this4;
      _classCallCheck(this, ClickVisit);
      _this4 = _callSuper(this, ClickVisit, arguments);
      _this4.name = "点击拜访";
      _this4.confirmAttempts = 10;
      return _this4;
    }
    _inherits(ClickVisit, _Step4);
    return _createClass(ClickVisit, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().guild.assist.visitBtnPos.x, getConfig().guild.assist.visitBtnPos.y);
        sleep(500);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return ScreenHelper.findMultiColors(getConfig().guild.assist.oneClickColor) !== null;
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return ClickAssist.name;
      }
    }]);
  }(Step);
  var ClickAssist = /*#__PURE__*/function (_Step5) {
    function ClickAssist() {
      var _this5;
      _classCallCheck(this, ClickAssist);
      _this5 = _callSuper(this, ClickAssist, arguments);
      _this5.name = "一键协助";
      return _this5;
    }
    _inherits(ClickAssist, _Step5);
    return _createClass(ClickAssist, [{
      key: "action",
      value: function action(ctx, task) {
        // 点击协助
        ClickHelper.tap(getConfig().guild.assist.assistBtnPos.x, getConfig().guild.assist.assistBtnPos.y);
        sleep(2000);
        // 关闭弹出的奖励弹窗，有时候没有这个奖励
        ClickHelper.tap(getConfig().guild.assist.assistBtnPos.x, getConfig().guild.assist.assistBtnPos.y);
        sleep(1000);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return ClickLike.name;
      }
    }]);
  }(Step);
  var ClickLike = /*#__PURE__*/function (_Step6) {
    function ClickLike() {
      var _this6;
      _classCallCheck(this, ClickLike);
      _this6 = _callSuper(this, ClickLike, arguments);
      _this6.name = "点赞";
      return _this6;
    }
    _inherits(ClickLike, _Step6);
    return _createClass(ClickLike, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().guild.assist.likeBtnPos.x, getConfig().guild.assist.likeBtnPos.y);
        sleep(2000);
        ClickHelper.tap(getConfig().guild.assist.likeBtnPos.x, getConfig().guild.assist.likeBtnPos.y);
        sleep(1000);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return BackToNeighbor.name;
      }
    }]);
  }(Step);
  var BackToNeighbor = /*#__PURE__*/function (_Step7) {
    function BackToNeighbor() {
      var _this7;
      _classCallCheck(this, BackToNeighbor);
      _this7 = _callSuper(this, BackToNeighbor, arguments);
      _this7.name = "回到邻居面板";
      return _this7;
    }
    _inherits(BackToNeighbor, _Step7);
    return _createClass(BackToNeighbor, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().guild.assist.backToNeighborPos.x, getConfig().guild.assist.backToNeighborPos.y);
        sleep(1000);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return CheckAssistable.name;
      }
    }]);
  }(Step);
  var guildAssistTask = new BaseTask({
    name: "协助他人",
    businessSteps: {
      OpenManor: new OpenManor(),
      OpenNeighborPanel: new OpenNeighborPanel(),
      CheckAssistable: new CheckAssistable(),
      ClickVisit: new ClickVisit(),
      ClickAssist: new ClickAssist(),
      ClickLike: new ClickLike(),
      BackToNeighbor: new BackToNeighbor()
    }
  });

  var OpenFriendPanel = /*#__PURE__*/function (_Step) {
    function OpenFriendPanel() {
      var _this;
      _classCallCheck(this, OpenFriendPanel);
      _this = _callSuper(this, OpenFriendPanel, arguments);
      _this.name = "打开好友面板";
      _this.confirmAttempts = 10;
      return _this;
    }
    _inherits(OpenFriendPanel, _Step);
    return _createClass(OpenFriendPanel, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().daily.staminaGift.friendPanelPos.x, getConfig().daily.staminaGift.friendPanelPos.y);
        sleep(500);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return OcrHelper.hasText(getConfig().daily.staminaGift.receiveStamina);
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return ReceiveStamina.name;
      }
    }]);
  }(Step);
  var ReceiveStamina = /*#__PURE__*/function (_Step2) {
    function ReceiveStamina() {
      var _this2;
      _classCallCheck(this, ReceiveStamina);
      _this2 = _callSuper(this, ReceiveStamina, arguments);
      _this2.name = "领取体力";
      _this2.confirmAttempts = 10;
      return _this2;
    }
    _inherits(ReceiveStamina, _Step2);
    return _createClass(ReceiveStamina, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().daily.staminaGift.receiveStaminaPos.x, getConfig().daily.staminaGift.receiveStaminaPos.y);
        sleep(500);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return OcrHelper.hasText(getConfig().daily.staminaGift.oneClickReceive);
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return OneClickReceive.name;
      }
    }]);
  }(Step);
  var OneClickReceive = /*#__PURE__*/function (_Step3) {
    function OneClickReceive() {
      var _this3;
      _classCallCheck(this, OneClickReceive);
      _this3 = _callSuper(this, OneClickReceive, arguments);
      _this3.name = "一键领取";
      return _this3;
    }
    _inherits(OneClickReceive, _Step3);
    return _createClass(OneClickReceive, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().daily.staminaGift.oneClickReceivePos.x, getConfig().daily.staminaGift.oneClickReceivePos.y);
        sleep(1000);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return ScreenHelper.findMultiColors(getConfig().daily.staminaGift.oneClickReceiveColor) !== null;
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return ClosePanel.name;
      }
    }]);
  }(Step);
  var ClosePanel = /*#__PURE__*/function (_Step4) {
    function ClosePanel() {
      var _this4;
      _classCallCheck(this, ClosePanel);
      _this4 = _callSuper(this, ClosePanel, arguments);
      _this4.name = "关闭一键领取面板";
      _this4.confirmAttempts = 10;
      return _this4;
    }
    _inherits(ClosePanel, _Step4);
    return _createClass(ClosePanel, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().daily.staminaGift.closePanelPos.x, getConfig().daily.staminaGift.closePanelPos.y);
        sleep(1000);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return OcrHelper.hasText(getConfig().daily.staminaGift.receiveStamina);
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return OneClickSend.name;
      }
    }]);
  }(Step);
  var OneClickSend = /*#__PURE__*/function (_Step5) {
    function OneClickSend() {
      var _this5;
      _classCallCheck(this, OneClickSend);
      _this5 = _callSuper(this, OneClickSend, arguments);
      _this5.name = "一键赠送";
      return _this5;
    }
    _inherits(OneClickSend, _Step5);
    return _createClass(OneClickSend, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().daily.staminaGift.oneClickSendPos.x, getConfig().daily.staminaGift.oneClickSendPos.y);
        sleep(1000);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
    }]);
  }(Step);
  var staminaGiftTask = new BaseTask({
    name: "赠送/领取体力",
    businessSteps: {
      OpenFriendPanel: new OpenFriendPanel(),
      ReceiveStamina: new ReceiveStamina(),
      OneClickReceive: new OneClickReceive(),
      ClosePanel: new ClosePanel(),
      OneClickSend: new OneClickSend()
    }
  });

  var ClickStartBattle = /*#__PURE__*/function (_Step) {
    function ClickStartBattle() {
      var _this;
      _classCallCheck(this, ClickStartBattle);
      _this = _callSuper(this, ClickStartBattle, arguments);
      _this.name = "点击开始战斗";
      _this.confirmAttempts = 10;
      return _this;
    }
    _inherits(ClickStartBattle, _Step);
    return _createClass(ClickStartBattle, [{
      key: "action",
      value: function action(ctx, task) {
        // 不需要前置检查，回到主页就已经验证过了
        ClickHelper.tap(getConfig().daily.stage.startBattlePos.x, getConfig().daily.stage.startBattlePos.y);
        sleep(1000);
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return ClickBattle.name;
      }
    }]);
  }(Step);
  var ClickBattle = /*#__PURE__*/function (_Step2) {
    function ClickBattle() {
      var _this2;
      _classCallCheck(this, ClickBattle);
      _this2 = _callSuper(this, ClickBattle, arguments);
      _this2.name = "点击出战";
      _this2.confirmAttempts = 10;
      return _this2;
    }
    _inherits(ClickBattle, _Step2);
    return _createClass(ClickBattle, [{
      key: "preCheck",
      value: function preCheck() {
        return function () {
          return OcrHelper.hasText(getConfig().daily.stage.battleBtn);
        };
      }
    }, {
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().daily.stage.battlePos.x, getConfig().daily.stage.battlePos.y);
        sleep(500);
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return ClickPause.name;
      }
    }]);
  }(Step);
  var ClickPause = /*#__PURE__*/function (_Step3) {
    function ClickPause() {
      var _this3;
      _classCallCheck(this, ClickPause);
      _this3 = _callSuper(this, ClickPause, arguments);
      _this3.name = "点击暂停";
      _this3.confirmAttempts = 10;
      return _this3;
    }
    _inherits(ClickPause, _Step3);
    return _createClass(ClickPause, [{
      key: "preCheck",
      value: function preCheck() {
        return function () {
          return OcrHelper.hasText(getConfig().daily.stage.refreshBtn);
        };
      }
    }, {
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().daily.stage.pausePos.x, getConfig().daily.stage.pausePos.y);
        sleep(500);
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return ClickExit.name;
      }
    }]);
  }(Step);
  var ClickExit = /*#__PURE__*/function (_Step4) {
    function ClickExit() {
      var _this4;
      _classCallCheck(this, ClickExit);
      _this4 = _callSuper(this, ClickExit, arguments);
      _this4.name = "点击退出";
      _this4.confirmAttempts = 10;
      return _this4;
    }
    _inherits(ClickExit, _Step4);
    return _createClass(ClickExit, [{
      key: "preCheck",
      value: function preCheck() {
        return function () {
          return OcrHelper.hasText(getConfig().daily.stage.exitBtn);
        };
      }
    }, {
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().daily.stage.exitPos.x, getConfig().daily.stage.exitPos.y);
        sleep(500);
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return ConfirmExit.name;
      }
    }]);
  }(Step);
  var ConfirmExit = /*#__PURE__*/function (_Step5) {
    function ConfirmExit() {
      var _this5;
      _classCallCheck(this, ConfirmExit);
      _this5 = _callSuper(this, ConfirmExit, arguments);
      _this5.name = "确认退出关卡";
      return _this5;
    }
    _inherits(ConfirmExit, _Step5);
    return _createClass(ConfirmExit, [{
      key: "preCheck",
      value: function preCheck() {
        return function () {
          return OcrHelper.hasText(getConfig().daily.stage.confirmBtn);
        };
      }
    }, {
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().daily.stage.confirmExitPos.x, getConfig().daily.stage.confirmExitPos.y);
        sleep(500);
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return DoubleReward.name;
      }
    }]);
  }(Step); // 双倍奖励
  var DoubleReward = /*#__PURE__*/function (_Step6) {
    function DoubleReward() {
      var _this6;
      _classCallCheck(this, DoubleReward);
      _this6 = _callSuper(this, DoubleReward, arguments);
      _this6.name = "双倍奖励";
      return _this6;
    }
    _inherits(DoubleReward, _Step6);
    return _createClass(DoubleReward, [{
      key: "canSkip",
      value: function canSkip(ctx) {
        // 检查是否有双倍奖励
        return !OcrHelper.hasText(getConfig().daily.stage.doubleRewardBtn);
      }
    }, {
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().daily.stage.doubleRewardPos.x, getConfig().daily.stage.doubleRewardPos.y);
        sleep(1000);
        ClickHelper.tap(getConfig().daily.stage.closeRewardPos.x, getConfig().daily.stage.closeRewardPos.y);
        sleep(1000);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return OcrHelper.hasText(getConfig().daily.stage.settleBtn);
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return SettlePage.name;
      }
    }]);
  }(Step);
  var SettlePage = /*#__PURE__*/function (_Step7) {
    function SettlePage() {
      var _this7;
      _classCallCheck(this, SettlePage);
      _this7 = _callSuper(this, SettlePage, arguments);
      _this7.name = "确定（结算页面）";
      return _this7;
    }
    _inherits(SettlePage, _Step7);
    return _createClass(SettlePage, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().daily.stage.settlePos.x, getConfig().daily.stage.settlePos.y);
        sleep(1500);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return OcrHelper.hasText(getConfig().daily.stage.startBattleBtn);
        };
      }
    }]);
  }(Step);
  var mainStageTask = new BaseTask({
    name: "主线关卡",
    businessSteps: {
      ClickStartBattle: new ClickStartBattle(),
      ClickBattle: new ClickBattle(),
      ClickPause: new ClickPause(),
      ClickExit: new ClickExit(),
      ConfirmExit: new ConfirmExit(),
      SettlePage: new SettlePage(),
      DoubleReward: new DoubleReward()
    }
  });

  var ClickTravel = /*#__PURE__*/function (_Step) {
    function ClickTravel() {
      var _this;
      _classCallCheck(this, ClickTravel);
      _this = _callSuper(this, ClickTravel, arguments);
      _this.name = "点击游历";
      _this.confirmAttempts = 10;
      return _this;
    }
    _inherits(ClickTravel, _Step);
    return _createClass(ClickTravel, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().daily.travel.travelPos.x, getConfig().daily.travel.travelPos.y);
        sleep(500);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return OcrHelper.hasText(getConfig().daily.travel.travelTitle);
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return ClickQuickTravel.name;
      }
    }]);
  }(Step);
  var ClickQuickTravel = /*#__PURE__*/function (_Step2) {
    function ClickQuickTravel() {
      var _this2;
      _classCallCheck(this, ClickQuickTravel);
      _this2 = _callSuper(this, ClickQuickTravel, arguments);
      _this2.name = "点击快速游历";
      return _this2;
    }
    _inherits(ClickQuickTravel, _Step2);
    return _createClass(ClickQuickTravel, [{
      key: "action",
      value: function action(ctx, task) {
        // 执行两次点击快速游历按钮，每日任务只需要游历两次。默认就两次了
        for (var i = 0; i < 2; i++) {
          ClickHelper.tap(getConfig().daily.travel.quickTravelPos.x, getConfig().daily.travel.quickTravelPos.y);
          sleep(500);
          // 第二次是关闭奖励弹窗
          ClickHelper.tap(getConfig().daily.travel.quickTravelPos.x, getConfig().daily.travel.quickTravelPos.y);
          sleep(500);
        }
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
    }]);
  }(Step);
  var quickTravelTask = new BaseTask({
    name: "快速游历",
    businessSteps: {
      ClickTravel: new ClickTravel(),
      ClickQuickTravel: new ClickQuickTravel()
    }
  });

  var OpenStaminaPanel = /*#__PURE__*/function (_Step) {
    function OpenStaminaPanel() {
      var _this;
      _classCallCheck(this, OpenStaminaPanel);
      _this = _callSuper(this, OpenStaminaPanel, arguments);
      _this.name = "打开体力窗口";
      _this.confirmAttempts = 10;
      return _this;
    }
    _inherits(OpenStaminaPanel, _Step);
    return _createClass(OpenStaminaPanel, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tap(getConfig().daily.buyStamina.staminaPos.x, getConfig().daily.buyStamina.staminaPos.y);
        sleep(500);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return OcrHelper.hasText(getConfig().daily.buyStamina.supplementTitle);
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return BuyStamina.name;
      }
    }]);
  }(Step);
  var BuyStamina = /*#__PURE__*/function (_Step2) {
    function BuyStamina() {
      var _this2;
      _classCallCheck(this, BuyStamina);
      _this2 = _callSuper(this, BuyStamina, arguments);
      _this2.name = "点击购买体力";
      return _this2;
    }
    _inherits(BuyStamina, _Step2);
    return _createClass(BuyStamina, [{
      key: "action",
      value: function action(ctx, task) {
        // 先点击免费购买体力图标, 体力免费购买次数最多就3次。5次冗余防止没有点到
        var retryCount = 0;
        while (retryCount < 5) {
          if (ScreenHelper.findMultiColors(getConfig().daily.buyStamina.freeBuyStaminaIcon)) {
            Logger.info(this.tag, "点击免费购买体力图标");
            ClickHelper.tap(getConfig().daily.buyStamina.buyStaminaPos.x, getConfig().daily.buyStamina.buyStaminaPos.y);
            sleep(1000);
            ClickHelper.tap(getConfig().daily.buyStamina.buyStaminaPos.x, getConfig().daily.buyStamina.buyStaminaPos.y);
            sleep(500);
            retryCount++;
          } else {
            break;
          }
        }
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
    }]);
  }(Step);
  var buyStaminaTask = new BaseTask({
    name: "购买体力",
    businessSteps: {
      OpenStaminaPanel: new OpenStaminaPanel(),
      BuyStamina: new BuyStamina()
    }
  });

  var EnterSummonPage = /*#__PURE__*/function (_Step) {
    function EnterSummonPage() {
      var _this;
      _classCallCheck(this, EnterSummonPage);
      _this = _callSuper(this, EnterSummonPage, arguments);
      _this.name = "进入召唤植物页面";
      return _this;
    }
    _inherits(EnterSummonPage, _Step);
    return _createClass(EnterSummonPage, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tapPoint(getConfig().daily.summon.enterSummonPos);
        sleep(500);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return FindNaturalSummon.name;
      }
    }]);
  }(Step);
  var FindNaturalSummon = /*#__PURE__*/function (_Step2) {
    function FindNaturalSummon() {
      var _this2;
      _classCallCheck(this, FindNaturalSummon);
      _this2 = _callSuper(this, FindNaturalSummon, arguments);
      _this2.name = "查找自然召唤";
      _this2.confirmAttempts = 10;
      return _this2;
    }
    _inherits(FindNaturalSummon, _Step2);
    return _createClass(FindNaturalSummon, [{
      key: "action",
      value: function action(ctx, task) {
        var match = OcrHelper.findText(getConfig().daily.summon.naturalSummon);
        if (match) {
          ClickHelper.tapCenter(match.bounds);
        }
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
    }, {
      key: "preCheck",
      value: function preCheck() {
        return function () {
          return OcrHelper.hasText(getConfig().daily.summon.naturalSummon);
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return CheckAbandonBtn.name;
      }
    }]);
  }(Step);
  var CheckAbandonBtn = /*#__PURE__*/function (_Step3) {
    function CheckAbandonBtn() {
      var _this3;
      _classCallCheck(this, CheckAbandonBtn);
      _this3 = _callSuper(this, CheckAbandonBtn, arguments);
      _this3.name = "检查放弃按钮";
      return _this3;
    }
    _inherits(CheckAbandonBtn, _Step3);
    return _createClass(CheckAbandonBtn, [{
      key: "canSkip",
      value: function canSkip(ctx, task) {
        return !OcrHelper.hasText(getConfig().daily.summon.abandonBtn);
      }
    }, {
      key: "preCheck",
      value: function preCheck() {
        return function () {
          return true;
        };
      }
    }, {
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tapPoint(getConfig().daily.summon.abandonBtnPos);
        sleep(1000);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return DoSummon.name;
      }
    }]);
  }(Step);
  var DoSummon = /*#__PURE__*/function (_Step4) {
    function DoSummon() {
      var _this4;
      _classCallCheck(this, DoSummon);
      _this4 = _callSuper(this, DoSummon, arguments);
      _this4.name = "召唤";
      _this4.confirmAttempts = 10;
      return _this4;
    }
    _inherits(DoSummon, _Step4);
    return _createClass(DoSummon, [{
      key: "preCheck",
      value: function preCheck() {
        return function () {
          return OcrHelper.hasText(getConfig().daily.summon.autoSummon);
        };
      }
    }, {
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tapPoint(getConfig().daily.summon.summonPos);
        sleep(1000);
        ClickHelper.tapPoint(getConfig().daily.summon.closeRewardPos);
        sleep(500);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return STEP_END;
      }
    }]);
  }(Step);
  var summonTask = new BaseTask({
    name: "自然召唤",
    businessSteps: {
      EnterSummonPage: new EnterSummonPage(),
      FindNaturalSummon: new FindNaturalSummon(),
      CheckAbandonBtn: new CheckAbandonBtn(),
      DoSummon: new DoSummon()
    }
  });

  var EnterWishPage = /*#__PURE__*/function (_Step) {
    function EnterWishPage() {
      var _this;
      _classCallCheck(this, EnterWishPage);
      _this = _callSuper(this, EnterWishPage, arguments);
      _this.name = "进入祈愿页面";
      return _this;
    }
    _inherits(EnterWishPage, _Step);
    return _createClass(EnterWishPage, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tapPoint(getConfig().daily.plantWish.enterWishPos);
        sleep(500);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return ClickPlantWish.name;
      }
    }]);
  }(Step);
  var ClickPlantWish = /*#__PURE__*/function (_Step2) {
    function ClickPlantWish() {
      var _this2;
      _classCallCheck(this, ClickPlantWish);
      _this2 = _callSuper(this, ClickPlantWish, arguments);
      _this2.name = "点击植物祈愿";
      _this2.confirmAttempts = 10;
      return _this2;
    }
    _inherits(ClickPlantWish, _Step2);
    return _createClass(ClickPlantWish, [{
      key: "action",
      value: function action(ctx, task) {
        var match = OcrHelper.findText(getConfig().daily.plantWish.plantWish);
        if (match) {
          ClickHelper.tapCenter(match.bounds);
        }
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return ScreenHelper.findMultiColors(getConfig().daily.plantWish.wishResultColor) !== null;
        };
      }
    }, {
      key: "preCheck",
      value: function preCheck() {
        return function () {
          return true;
        };
      }
    }, {
      key: "nextStep",
      value: function nextStep(ctx) {
        return FreeWish.name;
      }
    }]);
  }(Step);
  var FreeWish = /*#__PURE__*/function (_Step3) {
    function FreeWish() {
      var _this3;
      _classCallCheck(this, FreeWish);
      _this3 = _callSuper(this, FreeWish, arguments);
      _this3.name = "点击免费祈愿";
      return _this3;
    }
    _inherits(FreeWish, _Step3);
    return _createClass(FreeWish, [{
      key: "action",
      value: function action(ctx, task) {
        ClickHelper.tapPoint(getConfig().daily.plantWish.freeWishPos);
        sleep(500);
      }
    }, {
      key: "confirmCondition",
      value: function confirmCondition() {
        return function () {
          return true;
        };
      }
    }]);
  }(Step);
  var plantWishTask = new BaseTask({
    name: "植物祈愿",
    businessSteps: {
      EnterWishPage: new EnterWishPage(),
      ClickPlantWish: new ClickPlantWish(),
      FreeWish: new FreeWish()
    }
  });

  function buildLogLayout() {
    return ui.h("vertical", null, ui.h("linear", {
      orientation: "horizontal",
      h: "48",
      gravity: "center_vertical"
    }, ui.h("button", {
      id: "btnBack",
      text: "\u2190 \u8FD4\u56DE",
      textSize: "14sp",
      marginLeft: "4"
    }), ui.h("text", {
      text: "\u8FD0\u884C\u65E5\u5FD7",
      textSize: "18sp",
      textStyle: "bold",
      layout_weight: "1",
      gravity: "center"
    }), ui.h("button", {
      id: "btnClearLog",
      text: "\u6E05\u7A7A",
      textSize: "12sp",
      marginRight: "4"
    })), ui.h("scroll", {
      id: "logScroll",
      layout_weight: "1",
      bg: "#F5F5F5"
    }, ui.h("text", {
      id: "logText",
      text: "",
      textSize: "12sp",
      textColor: "#333333",
      fontFamily: "monospace",
      padding: "12"
    })));
  }
  var LogPage = /*#__PURE__*/function () {
    function LogPage() {
      _classCallCheck(this, LogPage);
      this._onBack = null;
      this._listener = null;
      this._w = null;
    }
    return _createClass(LogPage, [{
      key: "show",
      value: function show(onBack) {
        this._onBack = onBack || null;
        ui.layout(buildLogLayout());
        this._w = ui;
        this._loadHistory();
        this._bindButtons();
        this._startListening();
      }
    }, {
      key: "_loadHistory",
      value: function _loadHistory() {
        var history = LogStorage.readAll();
        if (history) {
          this._w.logText.setText(history.trimEnd());
          this._scrollToBottom();
        }
      }
    }, {
      key: "_bindButtons",
      value: function _bindButtons() {
        var self = this;
        this._w.btnBack.click(function () {
          self._stopListening();
          if (self._onBack) {
            self._onBack();
          }
        });
        this._w.btnClearLog.click(function () {
          LogStorage.clear();
          self._w.logText.setText("");
        });
      }
    }, {
      key: "_startListening",
      value: function _startListening() {
        var self = this;
        this._listener = function (formatted, _level) {
          ui.run(function () {
            if (!self._w) return;
            var text = self._w.logText;
            var current = text.text() || "";
            text.setText(current + (current ? "\n" : "") + formatted);
            self._scrollToBottom();
          });
        };
        Logger.addListener(this._listener);
      }
    }, {
      key: "_stopListening",
      value: function _stopListening() {
        if (this._listener) {
          Logger.removeListener(this._listener);
          this._listener = null;
        }
      }
    }, {
      key: "_scrollToBottom",
      value: function _scrollToBottom() {
        var scroll = this._w.logScroll;
        if (scroll) {
          scroll.post(function () {
            scroll.fullScroll(android.view.View.FOCUS_DOWN);
          });
        }
      }
    }]);
  }();

  var CATEGORIES = [{
    catAllId: "catAll_arena",
    taskIds: ["chk_单人匹配", "chk_组队匹配"]
  }, {
    catAllId: "catAll_daily",
    taskIds: ["chk_精彩活动", "chk_签到福利", "chk_主线关卡", "chk_快速游历", "chk_购买体力", "chk_赠送领取体力", "chk_商店购物", "chk_商店购买1次", "chk_植物升级", "chk_自然召唤", "chk_植物祈愿", "chk_点赞其他玩家", "chk_装备升级分解"]
  }, {
    catAllId: "catAll_guild",
    taskIds: ["chk_猎魔入侵", "chk_工会捐献", "chk_工会发言", "chk_协助他人"]
  }, {
    catAllId: "catAll_dungeon",
    taskIds: ["chk_日常副本", "chk_深渊领主", "chk_精英挑战", "chk_试炼之地", "chk_巅峰对决"]
  }];
  var ALL_TASK_IDS = CATEGORIES.flatMap(function (c) {
    return c.taskIds;
  });
  var ALL_CAT_IDS = CATEGORIES.map(function (c) {
    return c.catAllId;
  });
  var UNIMPLEMENTED_TASK_IDS = ["chk_精彩活动", "chk_签到福利", "chk_组队匹配", "chk_巅峰对决", "chk_商店购物", "chk_商店购买1次", "chk_植物升级", "chk_点赞其他玩家", "chk_装备升级分解"];
  var RUNS_INPUT_IDS = ["runs_主线关卡", "runs_单人匹配"];
  var TASK_CREATORS = {
    "chk_单人匹配": function chk_单人匹配(w) {
      var input = w["runs_单人匹配"];
      var totalRuns = input ? parseInt(input.text(), 10) : 1;
      return {
        task: createArenaTask(totalRuns > 0 ? totalRuns : 1)
      };
    },
    "chk_日常副本": function chk_日常副本() {
      return {
        task: dailyDungeonTask
      };
    },
    "chk_深渊领主": function chk_深渊领主() {
      return {
        task: abyssLordTask
      };
    },
    "chk_精英挑战": function chk_精英挑战() {
      return {
        task: eliteChallengeTask
      };
    },
    "chk_试炼之地": function chk_试炼之地() {
      return {
        task: trialLandTask
      };
    },
    "chk_猎魔入侵": function chk_猎魔入侵() {
      return {
        task: guildHuntTask
      };
    },
    "chk_工会捐献": function chk_工会捐献() {
      return {
        task: guildDonateTask
      };
    },
    "chk_工会发言": function chk_工会发言() {
      return {
        task: guildChatTask
      };
    },
    "chk_协助他人": function chk_协助他人() {
      return {
        task: guildAssistTask
      };
    },
    "chk_赠送领取体力": function chk_赠送领取体力() {
      return {
        task: staminaGiftTask
      };
    },
    "chk_主线关卡": function chk_主线关卡(w) {
      var input = w["runs_主线关卡"];
      var runs = input ? parseInt(input.text(), 10) : 1;
      return {
        task: mainStageTask,
        runs: runs > 0 ? runs : 1
      };
    },
    "chk_快速游历": function chk_快速游历() {
      return {
        task: quickTravelTask
      };
    },
    "chk_购买体力": function chk_购买体力() {
      return {
        task: buyStaminaTask
      };
    },
    "chk_自然召唤": function chk_自然召唤() {
      return {
        task: summonTask
      };
    },
    "chk_植物祈愿": function chk_植物祈愿() {
      return {
        task: plantWishTask
      };
    }
  };
  function taskNameFromId(id) {
    return id.replace(/^chk_/, "");
  }
  var HomeController = /*#__PURE__*/function () {
    function HomeController() {
      _classCallCheck(this, HomeController);
      this._isRunning = false;
    }
    return _createClass(HomeController, [{
      key: "onBind",
      value: function onBind(w, onBackFromLog) {
        this.bindCategoryCheckboxes(w);
        this.bindRunButton(w);
        this.bindStopButton(w);
        this.bindOpenLogButton(w, onBackFromLog);
        this.disableUnimplementedTasks(w);
      }
    }, {
      key: "disableUnimplementedTasks",
      value: function disableUnimplementedTasks(w) {
        for (var _i = 0, _UNIMPLEMENTED_TASK_I = UNIMPLEMENTED_TASK_IDS; _i < _UNIMPLEMENTED_TASK_I.length; _i++) {
          var id = _UNIMPLEMENTED_TASK_I[_i];
          var cb = w[id];
          if (cb) {
            cb.setEnabled(false);
            cb.setChecked(false);
          }
        }
      }
    }, {
      key: "bindCategoryCheckboxes",
      value: function bindCategoryCheckboxes(w) {
        var isUnimplemented = function isUnimplemented(id) {
          return UNIMPLEMENTED_TASK_IDS.includes(id);
        };
        var _loop = function _loop() {
          var cat = _CATEGORIES[_i2];
          var catCheckbox = w[cat.catAllId];
          var implementedIds = cat.taskIds.filter(function (id) {
            return !isUnimplemented(id);
          });
          if (catCheckbox) {
            catCheckbox.on("check", function (checked) {
              var _iterator = _createForOfIteratorHelper(implementedIds),
                _step;
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  var taskId = _step.value;
                  var cb = w[taskId];
                  if (cb) cb.setChecked(checked);
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
            });
          }
          var _iterator2 = _createForOfIteratorHelper(cat.taskIds),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var taskId = _step2.value;
              var cb = w[taskId];
              if (cb) {
                cb.on("check", function () {
                  var allChecked = implementedIds.every(function (id) {
                    return w[id] && w[id].checked;
                  });
                  if (catCheckbox) catCheckbox.setChecked(allChecked);
                });
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        };
        for (var _i2 = 0, _CATEGORIES = CATEGORIES; _i2 < _CATEGORIES.length; _i2++) {
          _loop();
        }
      }
    }, {
      key: "bindRunButton",
      value: function bindRunButton(w) {
        var self = this;
        w.btnRun.click(function () {
          if (self._isRunning) return;
          var checkedIds = ALL_TASK_IDS.filter(function (id) {
            return w[id] && w[id].checked;
          });
          if (checkedIds.length === 0) {
            toast("请至少勾选一个任务");
            return;
          }
          // 立即设置运行状态，防止快速点击导致重复启动
          self._isRunning = true;
          w.statusText.setText("检查权限...");
          threads.start(function () {
            if (!PermissionHelper.waitForAccessibility()) {
              ui.run(function () {
                toast("请先开启无障碍服务");
                w.statusText.setText("无障碍服务未开启");
                self._isRunning = false;
              });
              return;
            }
            if (!PermissionHelper.requestScreenCapture()) {
              ui.run(function () {
                toast("截图权限获取失败，请重新运行并授权");
                w.statusText.setText("截图权限未获取");
                self._isRunning = false;
              });
              return;
            }
            ScaleHelper.init();
            initConfig();
            setScreenMetrics(ScaleHelper.screenWidth, ScaleHelper.screenHeight);
            ui.run(function () {
              self.setUIEnabled(w, false);
              w.progressBar.setVisibility(0);
              w.statusText.setText("运行中...");
            });
            try {
              var chain = self.buildChain(w, checkedIds);
              runTaskChain(chain, createContext());
            } finally {
              ui.run(function () {
                self._isRunning = false;
                self.setUIEnabled(w, true);
                w.statusText.setText("全部完成");
                w.progressBar.setVisibility(8);
              });
            }
          });
        });
      }
    }, {
      key: "bindStopButton",
      value: function bindStopButton(w) {
        var self = this;
        w.btnStop.click(function () {
          stopEngine();
          self._isRunning = false;
          self.setUIEnabled(w, true);
          w.statusText.setText("已停止");
          w.progressBar.setVisibility(8);
          exit();
        });
      }
    }, {
      key: "bindOpenLogButton",
      value: function bindOpenLogButton(_w, onBackFromLog) {
        _w.btnOpenLog.click(function () {
          new LogPage().show(onBackFromLog);
        });
      }
    }, {
      key: "buildChain",
      value: function buildChain(w, checkedIds) {
        var chain = [];
        var dualAppMode = this.readDualAppMode(w);
        chain.push({
          task: createLaunchGameTask(dualAppMode)
        });
        var _iterator3 = _createForOfIteratorHelper(checkedIds),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var id = _step3.value;
            var creator = TASK_CREATORS[id];
            if (!creator) {
              toast("\u4EFB\u52A1\"".concat(taskNameFromId(id), "\"\u5C1A\u672A\u5B9E\u73B0\uFF0C\u8DF3\u8FC7"));
              continue;
            }
            chain.push(creator(w));
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
        return chain;
      }
    }, {
      key: "readDualAppMode",
      value: function readDualAppMode(w) {
        var spinner = w.spinner_dualApp;
        if (!spinner) return DualAppMode.NONE;
        var idx = spinner.getSelectedItemPosition();
        if (idx === 1) return DualAppMode.DUAL1;
        if (idx === 2) return DualAppMode.DUAL2;
        return DualAppMode.NONE;
      }
    }, {
      key: "setUIEnabled",
      value: function setUIEnabled(w, enabled) {
        w.btnRun.setEnabled(enabled);
        var _iterator4 = _createForOfIteratorHelper(ALL_TASK_IDS),
          _step4;
        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var id = _step4.value;
            var cb = w[id];
            if (cb) cb.setEnabled(enabled && !UNIMPLEMENTED_TASK_IDS.includes(id));
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
        var _iterator5 = _createForOfIteratorHelper(ALL_CAT_IDS),
          _step5;
        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var _id = _step5.value;
            var _cb = w[_id];
            if (_cb) _cb.setEnabled(enabled);
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
        for (var _i3 = 0, _RUNS_INPUT_IDS = RUNS_INPUT_IDS; _i3 < _RUNS_INPUT_IDS.length; _i3++) {
          var inputId = _RUNS_INPUT_IDS[_i3];
          var input = w[inputId];
          if (input) input.setEnabled(enabled);
        }
        w.progressBar.setVisibility(enabled ? 8 : 0);
      }
    }]);
  }();

  function buildLayout() {
    return ui.h("vertical", null, ui.h("scroll", {
      layout_weight: "1"
    }, ui.h("vertical", {
      padding: "16"
    }, ui.h("frame", {
      h: "48"
    }, ui.h("text", {
      text: "AutoGameFlow",
      textSize: "22sp",
      textStyle: "bold",
      gravity: "center"
    }), ui.h("button", {
      id: "btnOpenLog",
      text: "\u65E5\u5FD7",
      textSize: "12sp",
      layout_gravity: "right|center_vertical",
      marginRight: "4"
    })), ui.h("card", {
      cardCornerRadius: "8",
      cardElevation: "2",
      marginBottom: "10",
      w: "*",
      h: "auto"
    }, ui.h("vertical", {
      padding: "12"
    }, ui.h("horizontal", {
      marginBottom: "6",
      gravity: "center_vertical"
    }, ui.h("text", {
      text: "\u542F\u52A8\u914D\u7F6E",
      textSize: "15sp",
      textStyle: "bold",
      layout_weight: "1"
    })), ui.h("horizontal", {
      marginBottom: "4",
      gravity: "center_vertical"
    }, ui.h("text", {
      text: "\u53CC\u5F00\u6A21\u5F0F:",
      textSize: "13sp"
    }), ui.h("spinner", {
      id: "spinner_dualApp",
      entries: "\u672A\u53CC\u5F00|\u53CC\u5F001|\u53CC\u5F002",
      selectedIndex: "0",
      marginLeft: "8",
      layout_weight: "1"
    })))), ui.h("card", {
      cardCornerRadius: "8",
      cardElevation: "2",
      marginBottom: "10",
      w: "*",
      h: "auto"
    }, ui.h("vertical", {
      padding: "12"
    }, ui.h("horizontal", {
      marginBottom: "6",
      gravity: "center_vertical"
    }, ui.h("text", {
      text: "\u7ADE\u6280\u5BF9\u51B3",
      textSize: "15sp",
      textStyle: "bold",
      layout_weight: "1"
    }), ui.h("checkbox", {
      id: "catAll_arena",
      text: "\u5168\u9009",
      textSize: "12sp",
      checked: "false"
    })), ui.h("horizontal", {
      marginBottom: "4",
      gravity: "center_vertical"
    }, ui.h("checkbox", {
      id: "chk_\u5355\u4EBA\u5339\u914D",
      text: "\u5355\u4EBA\u5339\u914D",
      textSize: "13sp",
      layout_weight: "1",
      checked: "false"
    }), ui.h("text", {
      text: "\u6B21\u6570:",
      textSize: "12sp",
      marginLeft: "4"
    }), ui.h("input", {
      id: "runs_\u5355\u4EBA\u5339\u914D",
      text: "1",
      textSize: "13sp",
      inputType: "number",
      w: "80",
      marginLeft: "4",
      singleLine: "true"
    })), ui.h("horizontal", {
      marginBottom: "4"
    }, ui.h("checkbox", {
      id: "chk_\u7EC4\u961F\u5339\u914D",
      text: "\u7EC4\u961F\u5339\u914D",
      textSize: "13sp",
      layout_weight: "1",
      checked: "false"
    })))), ui.h("card", {
      cardCornerRadius: "8",
      cardElevation: "2",
      marginBottom: "10",
      w: "*",
      h: "auto"
    }, ui.h("vertical", {
      padding: "12"
    }, ui.h("horizontal", {
      marginBottom: "6",
      gravity: "center_vertical"
    }, ui.h("text", {
      text: "\u6BCF\u65E5\u4EFB\u52A1",
      textSize: "15sp",
      textStyle: "bold",
      layout_weight: "1"
    }), ui.h("checkbox", {
      id: "catAll_daily",
      text: "\u5168\u9009",
      textSize: "12sp",
      checked: "false"
    })), ui.h("horizontal", {
      marginBottom: "4"
    }, ui.h("checkbox", {
      id: "chk_\u7CBE\u5F69\u6D3B\u52A8",
      text: "\u7CBE\u5F69\u6D3B\u52A8",
      textSize: "13sp",
      layout_weight: "1",
      checked: "false"
    }), ui.h("checkbox", {
      id: "chk_\u7B7E\u5230\u798F\u5229",
      text: "\u7B7E\u5230\u798F\u5229",
      textSize: "13sp",
      layout_weight: "1",
      checked: "false"
    })), ui.h("horizontal", {
      marginBottom: "4",
      gravity: "center_vertical"
    }, ui.h("checkbox", {
      id: "chk_\u4E3B\u7EBF\u5173\u5361",
      text: "\u4E3B\u7EBF\u5173\u5361",
      textSize: "13sp",
      layout_weight: "1",
      checked: "false"
    }), ui.h("text", {
      text: "\u6B21\u6570:",
      textSize: "12sp",
      marginLeft: "4"
    }), ui.h("input", {
      id: "runs_\u4E3B\u7EBF\u5173\u5361",
      text: "1",
      textSize: "13sp",
      inputType: "number",
      w: "80",
      marginLeft: "4",
      singleLine: "true"
    })), ui.h("horizontal", {
      marginBottom: "4"
    }, ui.h("checkbox", {
      id: "chk_\u5FEB\u901F\u6E38\u5386",
      text: "\u5FEB\u901F\u6E38\u5386",
      textSize: "13sp",
      layout_weight: "1",
      checked: "false"
    }), ui.h("checkbox", {
      id: "chk_\u8D2D\u4E70\u4F53\u529B",
      text: "\u8D2D\u4E70\u4F53\u529B",
      textSize: "13sp",
      layout_weight: "1",
      checked: "false"
    })), ui.h("horizontal", {
      marginBottom: "4"
    }, ui.h("checkbox", {
      id: "chk_\u8D60\u9001\u9886\u53D6\u4F53\u529B",
      text: "\u8D60\u9001/\u9886\u53D6\u4F53\u529B",
      textSize: "13sp",
      layout_weight: "1",
      checked: "false"
    }), ui.h("checkbox", {
      id: "chk_\u5546\u5E97\u8D2D\u7269",
      text: "\u5546\u5E97\u8D2D\u7269",
      textSize: "13sp",
      layout_weight: "1",
      checked: "false"
    })), ui.h("horizontal", {
      marginBottom: "4"
    }, ui.h("checkbox", {
      id: "chk_\u5546\u5E97\u8D2D\u4E701\u6B21",
      text: "\u5546\u5E97\u8D2D\u4E701\u6B21",
      textSize: "13sp",
      layout_weight: "1",
      checked: "false"
    }), ui.h("checkbox", {
      id: "chk_\u690D\u7269\u5347\u7EA7",
      text: "\u690D\u7269\u5347\u7EA7",
      textSize: "13sp",
      layout_weight: "1",
      checked: "false"
    })), ui.h("horizontal", {
      marginBottom: "4"
    }, ui.h("checkbox", {
      id: "chk_\u81EA\u7136\u53EC\u5524",
      text: "\u81EA\u7136\u53EC\u5524",
      textSize: "13sp",
      layout_weight: "1",
      checked: "false"
    }), ui.h("checkbox", {
      id: "chk_\u690D\u7269\u7948\u613F",
      text: "\u690D\u7269\u7948\u613F",
      textSize: "13sp",
      layout_weight: "1",
      checked: "false"
    }), ui.h("checkbox", {
      id: "chk_\u70B9\u8D5E\u5176\u4ED6\u73A9\u5BB6",
      text: "\u70B9\u8D5E\u5176\u4ED6\u73A9\u5BB6",
      textSize: "13sp",
      layout_weight: "1",
      checked: "false"
    })), ui.h("horizontal", {
      marginBottom: "4"
    }, ui.h("checkbox", {
      id: "chk_\u88C5\u5907\u5347\u7EA7\u5206\u89E3",
      text: "\u88C5\u5907\u5347\u7EA7\u5206\u89E3",
      textSize: "13sp",
      layout_weight: "1",
      checked: "false"
    })))), ui.h("card", {
      cardCornerRadius: "8",
      cardElevation: "2",
      marginBottom: "10",
      w: "*",
      h: "auto"
    }, ui.h("vertical", {
      padding: "12"
    }, ui.h("horizontal", {
      marginBottom: "6",
      gravity: "center_vertical"
    }, ui.h("text", {
      text: "\u5DE5\u4F1A\u4EFB\u52A1",
      textSize: "15sp",
      textStyle: "bold",
      layout_weight: "1"
    }), ui.h("checkbox", {
      id: "catAll_guild",
      text: "\u5168\u9009",
      textSize: "12sp",
      checked: "false"
    })), ui.h("horizontal", {
      marginBottom: "4"
    }, ui.h("checkbox", {
      id: "chk_\u730E\u9B54\u5165\u4FB5",
      text: "\u730E\u9B54\u5165\u4FB5",
      textSize: "13sp",
      layout_weight: "1",
      checked: "false"
    }), ui.h("checkbox", {
      id: "chk_\u5DE5\u4F1A\u6350\u732E",
      text: "\u5DE5\u4F1A\u6350\u732E",
      textSize: "13sp",
      layout_weight: "1",
      checked: "false"
    })), ui.h("horizontal", {
      marginBottom: "4"
    }, ui.h("checkbox", {
      id: "chk_\u5DE5\u4F1A\u53D1\u8A00",
      text: "\u5DE5\u4F1A\u53D1\u8A00",
      textSize: "13sp",
      layout_weight: "1",
      checked: "false"
    }), ui.h("checkbox", {
      id: "chk_\u534F\u52A9\u4ED6\u4EBA",
      text: "\u534F\u52A9\u4ED6\u4EBA",
      textSize: "13sp",
      layout_weight: "1",
      checked: "false"
    })))), ui.h("card", {
      cardCornerRadius: "8",
      cardElevation: "2",
      marginBottom: "10",
      w: "*",
      h: "auto"
    }, ui.h("vertical", {
      padding: "12"
    }, ui.h("horizontal", {
      marginBottom: "6",
      gravity: "center_vertical"
    }, ui.h("text", {
      text: "\u526F\u672C\u4EFB\u52A1",
      textSize: "15sp",
      textStyle: "bold",
      layout_weight: "1"
    }), ui.h("checkbox", {
      id: "catAll_dungeon",
      text: "\u5168\u9009",
      textSize: "12sp",
      checked: "false"
    })), ui.h("horizontal", {
      marginBottom: "4"
    }, ui.h("checkbox", {
      id: "chk_\u65E5\u5E38\u526F\u672C",
      text: "\u65E5\u5E38\u526F\u672C",
      textSize: "13sp",
      layout_weight: "1",
      checked: "false"
    }), ui.h("checkbox", {
      id: "chk_\u6DF1\u6E0A\u9886\u4E3B",
      text: "\u6DF1\u6E0A\u9886\u4E3B",
      textSize: "13sp",
      layout_weight: "1",
      checked: "false"
    })), ui.h("horizontal", {
      marginBottom: "4"
    }, ui.h("checkbox", {
      id: "chk_\u7CBE\u82F1\u6311\u6218",
      text: "\u7CBE\u82F1\u6311\u6218",
      textSize: "13sp",
      layout_weight: "1",
      checked: "false"
    }), ui.h("checkbox", {
      id: "chk_\u8BD5\u70BC\u4E4B\u5730",
      text: "\u8BD5\u70BC\u4E4B\u5730",
      textSize: "13sp",
      layout_weight: "1",
      checked: "false"
    })), ui.h("horizontal", {
      marginBottom: "4"
    }, ui.h("checkbox", {
      id: "chk_\u5DC5\u5CF0\u5BF9\u51B3",
      text: "\u5DC5\u5CF0\u5BF9\u51B3",
      textSize: "13sp",
      layout_weight: "1",
      checked: "false"
    })))))), ui.h("vertical", null, ui.h("horizontal", {
      gravity: "center",
      marginBottom: "10"
    }, ui.h("button", {
      id: "btnRun",
      text: "\u5F00\u59CB\u8FD0\u884C",
      style: "Widget.AppCompat.Button.Colored",
      layout_weight: "1"
    }), ui.h("button", {
      id: "btnStop",
      text: "\u505C\u6B62",
      marginLeft: "8",
      layout_weight: "1"
    })), ui.h("card", {
      cardCornerRadius: "8",
      cardElevation: "2",
      marginBottom: "10",
      w: "*",
      h: "auto"
    }, ui.h("vertical", {
      padding: "12"
    }, ui.h("text", {
      text: "\u72B6\u6001",
      textSize: "14sp",
      textStyle: "bold",
      marginBottom: "8"
    }), ui.h("text", {
      id: "statusText",
      text: "\u5C31\u7EEA",
      textSize: "14sp"
    }), ui.h("progressbar", {
      id: "progressBar",
      indeterminate: "true",
      visibility: "gone",
      marginTop: "8"
    })))));
  }
  var HomePage = /*#__PURE__*/function () {
    function HomePage() {
      _classCallCheck(this, HomePage);
    }
    return _createClass(HomePage, [{
      key: "show",
      value: function show() {
        ui.layout(buildLayout());
        var controller = new HomeController();
        controller.onBind(ui, function () {
          return new HomePage().show();
        });
      }
    }]);
  }();

  console.log("App", "启动应用");
  var page = new HomePage();
  page.show();
  console.log("App", "UI 初始化完成");

})();
