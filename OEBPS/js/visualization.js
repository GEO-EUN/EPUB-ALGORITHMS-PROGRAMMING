;(() => {
  // 시뮬레이션 상태 관리
  class AlgorithmSimulator {
    constructor(type) {
      this.type = type
      this.currentStep = -1
      this.isRunning = false
      this.isPaused = false
      this.intervalId = null
      this.speed = 1500 // 1.5초 간격
      this.testResults = []
      this.initializeControls()
      this.initializeInputHandlers()
      this.reset()
    }

    initializeControls() {
      const prefix = this.type.substring(0, 3) // seq, sel, rep

      this.playBtn = document.getElementById(`${prefix}-play`)
      this.pauseBtn = document.getElementById(`${prefix}-pause`)
      this.resetBtn = document.getElementById(`${prefix}-reset`)

      if (this.playBtn) this.playBtn.addEventListener("click", () => this.play())
      if (this.pauseBtn) this.pauseBtn.addEventListener("click", () => this.pause())
      if (this.resetBtn) this.resetBtn.addEventListener("click", () => this.reset())
    }

    initializeInputHandlers() {
      const runCustomBtn = document.getElementById(`${this.type.substring(0, 3)}-run-custom`)
      if (runCustomBtn) {
        runCustomBtn.addEventListener("click", () => this.runCustomSimulation())
      }

      const clearResultsBtn = document.getElementById(`${this.type.substring(0, 3)}-clear-results`)
      if (clearResultsBtn) {
        clearResultsBtn.addEventListener("click", () => this.clearResults())
      }

      // 테스트 케이스 버튼들
      document.querySelectorAll(".test-case button").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const testCase = e.target.closest(".test-case")
          this.loadTestCase(testCase)
        })
      })
    }

    validateInputs() {
      const errors = []

      if (this.type === "sequential") {
        const a = document.getElementById("custom-a").value
        const b = document.getElementById("custom-b").value

        if (!a || isNaN(a)) errors.push("A 값을 올바르게 입력해주세요.")
        if (!b || isNaN(b)) errors.push("B 값을 올바르게 입력해주세요.")
        if (Math.abs(a) > 1000 || Math.abs(b) > 1000) errors.push("입력값은 -1000 ~ 1000 범위 내에서 입력해주세요.")
      } else if (this.type === "selection") {
        const score = document.getElementById("custom-score").value
        const threshold = document.getElementById("custom-threshold").value

        if (!score || isNaN(score)) errors.push("점수를 올바르게 입력해주세요.")
        if (!threshold || isNaN(threshold)) errors.push("기준점을 올바르게 입력해주세요.")
        if (score < 0 || score > 100) errors.push("점수는 0~100 범위 내에서 입력해주세요.")
        if (threshold < 0 || threshold > 100) errors.push("기준점은 0~100 범위 내에서 입력해주세요.")
      } else if (this.type === "repetition") {
        const start = document.getElementById("custom-start").value
        const end = document.getElementById("custom-end").value
        const operation = document.getElementById("custom-operation").value

        if (!start || isNaN(start)) errors.push("시작값을 올바르게 입력해주세요.")
        if (!end || isNaN(end)) errors.push("끝값을 올바르게 입력해주세요.")
        if (Number.parseInt(start) >= Number.parseInt(end)) errors.push("시작값은 끝값보다 작아야 합니다.")
        if (Number.parseInt(end) - Number.parseInt(start) > 20) errors.push("범위는 20 이하로 설정해주세요.")
      }

      return errors
    }

    runCustomSimulation() {
      const errors = this.validateInputs()
      const errorDiv = document.getElementById(`${this.type.substring(0, 3)}-validation-error`)

      if (errors.length > 0) {
        errorDiv.innerHTML = errors.map((err) => `<div>${err}</div>`).join("")
        return
      }

      errorDiv.innerHTML = ""

      // 사용자 입력값으로 시뮬레이션 설정 업데이트
      this.updateSimulationWithCustomInputs()

      // 시뮬레이션 실행
      this.reset()
      this.play()

      // 결과 저장
      setTimeout(
        () => {
          this.saveResult()
        },
        (this.getStepCount() + 1) * this.speed + 500,
      )
    }

    updateSimulationWithCustomInputs() {
      if (this.type === "sequential") {
        const a = document.getElementById("custom-a").value
        const b = document.getElementById("custom-b").value
        document.getElementById("input-a").value = a
        document.getElementById("input-b").value = b
      } else if (this.type === "selection") {
        const score = document.getElementById("custom-score").value
        const threshold = document.getElementById("custom-threshold").value
        document.getElementById("input-score").value = score
        this.customThreshold = Number.parseInt(threshold)
      } else if (this.type === "repetition") {
        const start = document.getElementById("custom-start").value
        const end = document.getElementById("custom-end").value
        const operation = document.getElementById("custom-operation").value
        document.getElementById("input-limit").value = end
        this.customStart = Number.parseInt(start)
        this.customOperation = operation
      }
    }

    getStepCount() {
      return document.querySelectorAll(".step").length
    }

    saveResult() {
      let result = {}

      if (this.type === "sequential") {
        const a = Number.parseInt(document.getElementById("input-a").value)
        const b = Number.parseInt(document.getElementById("input-b").value)
        result = {
          inputs: `A=${a}, B=${b}`,
          output: a + b,
          timestamp: new Date().toLocaleTimeString(),
        }
      } else if (this.type === "selection") {
        const score = Number.parseInt(document.getElementById("input-score").value)
        const threshold = this.customThreshold || 60
        result = {
          inputs: `점수=${score}, 기준=${threshold}`,
          output: score >= threshold ? "합격" : "불합격",
          timestamp: new Date().toLocaleTimeString(),
        }
      } else if (this.type === "repetition") {
        const start = this.customStart || 1
        const end = Number.parseInt(document.getElementById("input-limit").value)
        const operation = this.customOperation || "sum"
        let output = 0

        if (operation === "sum") {
          for (let i = start; i <= end; i++) output += i
        } else if (operation === "product") {
          output = 1
          for (let i = start; i <= end; i++) output *= i
        } else if (operation === "even") {
          for (let i = start; i <= end; i++) {
            if (i % 2 === 0) output += i
          }
        }

        result = {
          inputs: `${start}~${end} (${operation})`,
          output: output,
          timestamp: new Date().toLocaleTimeString(),
        }
      }

      this.testResults.push(result)
      this.updateResultsDisplay()
    }

    updateResultsDisplay() {
      const resultsDiv = document.getElementById(`${this.type.substring(0, 3)}-results`)
      if (!resultsDiv) return

      resultsDiv.innerHTML = this.testResults
        .map(
          (result, index) => `
      <div class="result-item">
        <span>${result.inputs}</span>
        <span class="test-case-result">${result.output}</span>
        <small>${result.timestamp}</small>
      </div>
    `,
        )
        .join("")
    }

    clearResults() {
      this.testResults = []
      this.updateResultsDisplay()
    }

    loadTestCase(testCaseElement) {
      // 모든 테스트 케이스에서 active 클래스 제거
      document.querySelectorAll(".test-case").forEach((tc) => tc.classList.remove("active"))
      testCaseElement.classList.add("active")

      const inputs = testCaseElement.dataset.inputs.split(",")

      if (this.type === "sequential") {
        document.getElementById("custom-a").value = inputs[0]
        document.getElementById("custom-b").value = inputs[1]
      } else if (this.type === "selection") {
        document.getElementById("custom-score").value = inputs[0]
        document.getElementById("custom-threshold").value = inputs[1] || "60"
      } else if (this.type === "repetition") {
        document.getElementById("custom-start").value = inputs[0]
        document.getElementById("custom-end").value = inputs[1]
        document.getElementById("custom-operation").value = inputs[2] || "sum"
      }
    }

    play() {
      if (this.isPaused) {
        this.isPaused = false
        this.resume()
      } else {
        this.start()
      }
      this.updateControls()
    }

    pause() {
      this.isPaused = true
      if (this.intervalId) {
        clearInterval(this.intervalId)
        this.intervalId = null
      }
      this.updateControls()
    }

    reset() {
      this.currentStep = -1
      this.isRunning = false
      this.isPaused = false
      if (this.intervalId) {
        clearInterval(this.intervalId)
        this.intervalId = null
      }

      // 모든 단계 초기화
      document.querySelectorAll(".step").forEach((step) => {
        step.classList.remove("active", "completed")
      })

      this.resetVariables()
      this.updateControls()
    }

    start() {
      this.isRunning = true
      this.nextStep()
    }

    resume() {
      if (this.isRunning) {
        this.nextStep()
      }
    }

    nextStep() {
      if (this.isPaused) return

      // 이전 단계를 완료로 표시
      if (this.currentStep >= 0) {
        const prevStep = document.querySelector(`[data-step="${this.currentStep}"]`)
        if (prevStep) {
          prevStep.classList.remove("active")
          prevStep.classList.add("completed")
        }
      }

      this.currentStep++

      // 현재 단계 실행
      this.executeStep(this.currentStep)

      // 다음 단계가 있는지 확인
      const nextStepElement = document.querySelector(`[data-step="${this.currentStep + 1}"]`)
      if (nextStepElement && this.isRunning && !this.isPaused) {
        this.intervalId = setTimeout(() => this.nextStep(), this.speed)
      } else {
        this.isRunning = false
        this.updateControls()
      }
    }

    executeStep(stepIndex) {
      const stepElement = document.querySelector(`[data-step="${stepIndex}"]`)
      if (!stepElement) return

      stepElement.classList.add("active")

      // 타입별 단계 실행
      if (this.type === "sequential") {
        this.executeSequentialStep(stepIndex)
      } else if (this.type === "selection") {
        this.executeSelectionStep(stepIndex)
      } else if (this.type === "repetition") {
        this.executeRepetitionStep(stepIndex)
      }
    }

    executeSequentialStep(step) {
      const aInput = document.getElementById("input-a")
      const bInput = document.getElementById("input-b")

      switch (step) {
        case 1: // A 입력
          this.updateVariable("var-a", aInput.value)
          break
        case 2: // B 입력
          this.updateVariable("var-b", bInput.value)
          break
        case 3: // 합 계산
          const sum = Number.parseInt(aInput.value) + Number.parseInt(bInput.value)
          this.updateVariable("var-sum", sum)
          document.getElementById("result").textContent = sum
          break
        case 4: // 결과 출력
          document.getElementById("output").textContent = document.getElementById("var-sum").textContent
          break
      }
    }

    executeSelectionStep(step) {
      const scoreInput = document.getElementById("input-score")
      const score = Number.parseInt(scoreInput.value)
      const threshold = this.customThreshold || 60

      switch (step) {
        case 1: // 점수 입력
          this.updateVariable("var-score", score)
          break
        case 2: // 조건 검사
          const condition = score >= threshold
          document.getElementById("condition-result").textContent = condition ? "참 (True)" : "거짓 (False)"

          // 분기 표시
          const trueStep = document.querySelector('[data-step="3"]')
          const falseStep = document.querySelector('[data-step="4"]')

          if (condition) {
            trueStep.style.display = "flex"
            falseStep.style.display = "none"
            this.currentStep = 2 // 다음에 3번 단계로
          } else {
            trueStep.style.display = "none"
            falseStep.style.display = "flex"
            this.currentStep = 3 // 다음에 4번 단계로
          }
          break
        case 3: // 합격
          this.updateVariable("var-result", "합격")
          document.getElementById("grade-output").textContent = "합격"
          this.currentStep = 4 // 5번 단계로 건너뛰기
          break
        case 4: // 불합격
          this.updateVariable("var-result", "불합격")
          document.getElementById("grade-output").textContent = "불합격"
          this.currentStep = 4 // 5번 단계로 건너뛰기
          break
      }
    }

    executeRepetitionStep(step) {
      if (!this.loopState) {
        this.loopState = {
          i: this.customStart || 1,
          sum: this.customOperation === "product" ? 1 : 0,
          limit: Number.parseInt(document.getElementById("input-limit").value),
          iterations: 0,
          operation: this.customOperation || "sum",
        }
      }

      switch (step) {
        case 1: // 합계 초기화
          this.loopState.sum = this.loopState.operation === "product" ? 1 : 0
          this.updateVariable("var-total", this.loopState.sum)
          break
        case 2: // i 초기화
          this.loopState.i = this.customStart || 1
          this.updateVariable("var-i", this.loopState.i)
          break
        case 3: // 조건 검사
          const condition = this.loopState.i <= this.loopState.limit
          document.getElementById("loop-check").textContent = condition ? "참 (계속)" : "거짓 (종료)"

          if (!condition) {
            this.currentStep = 5 // 종료로 건너뛰기
          }
          break
        case 4: // 연산 수행
          if (this.loopState.operation === "sum") {
            this.loopState.sum += this.loopState.i
          } else if (this.loopState.operation === "product") {
            this.loopState.sum *= this.loopState.i
          } else if (this.loopState.operation === "even" && this.loopState.i % 2 === 0) {
            this.loopState.sum += this.loopState.i
          }
          this.updateVariable("var-total", this.loopState.sum)
          this.addIterationLog()
          break
        case 5: // i 증가
          this.loopState.i++
          this.updateVariable("var-i", this.loopState.i)
          this.loopState.iterations++
          this.updateVariable("loop-count", this.loopState.iterations)

          // 조건 검사로 돌아가기
          if (this.loopState.i <= this.loopState.limit) {
            this.currentStep = 2 // 조건 검사로 돌아가기
          }
          break
        case 6: // 최종 출력
          document.getElementById("final-sum").textContent = this.loopState.sum
          break
      }
    }

    addIterationLog() {
      const log = document.getElementById("iteration-log")
      const item = document.createElement("div")
      item.className = "iteration-item current"
      item.textContent = `반복 ${this.loopState.iterations + 1}: i=${this.loopState.i}, 합계=${this.loopState.sum}`

      // 이전 항목들의 current 클래스 제거
      log.querySelectorAll(".current").forEach((el) => el.classList.remove("current"))

      log.appendChild(item)
    }

    updateVariable(elementId, value) {
      const element = document.getElementById(elementId)
      if (element) {
        element.textContent = value
        element.style.background = "#fff3cd"
        setTimeout(() => {
          element.style.background = "#fff"
        }, 800)
      }
    }

    resetVariables() {
      // 순차 구조 변수 리셋
      const seqVars = ["var-a", "var-b", "var-sum", "result", "output"]
      seqVars.forEach((id) => {
        const el = document.getElementById(id)
        if (el) el.textContent = el.id === "result" || el.id === "output" ? "?" : "-"
      })

      // 선택 구조 변수 리셋
      const selVars = ["var-score", "var-result", "condition-result", "grade-output"]
      selVars.forEach((id) => {
        const el = document.getElementById(id)
        if (el) el.textContent = el.id.includes("result") || el.id.includes("output") ? "?" : "-"
      })

      // 반복 구조 변수 리셋
      const repVars = ["var-i", "var-total", "loop-count", "loop-check", "final-sum"]
      repVars.forEach((id) => {
        const el = document.getElementById(id)
        if (el) el.textContent = el.id.includes("check") || el.id.includes("sum") ? "?" : "-"
      })

      // 반복 로그 초기화
      const log = document.getElementById("iteration-log")
      if (log) log.innerHTML = ""

      // 분기 단계 표시 리셋
      const branches = document.querySelectorAll(".branch-true, .branch-false")
      branches.forEach((branch) => (branch.style.display = "flex"))

      this.loopState = null
    }

    updateControls() {
      if (this.playBtn) this.playBtn.disabled = this.isRunning && !this.isPaused
      if (this.pauseBtn) this.pauseBtn.disabled = !this.isRunning || this.isPaused
      if (this.resetBtn) this.resetBtn.disabled = false
    }
  }

  // 페이지 로드 시 시뮬레이터 초기화
  document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname
    const page = path.substring(path.lastIndexOf("/") + 1)

    let simulatorType = ""
    if (page.includes("sequential")) {
      simulatorType = "sequential"
    } else if (page.includes("selection")) {
      simulatorType = "selection"
    } else if (page.includes("repetition")) {
      simulatorType = "repetition"
    }

    if (simulatorType) {
      new AlgorithmSimulator(simulatorType)
    }
  })
})()
