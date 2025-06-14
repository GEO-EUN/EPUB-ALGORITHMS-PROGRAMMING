;(() => {
  // 각 페이지의 정답 설정
  const answers = {
    "sequential.xhtml": "B", // 순차 구조에 해당하지 않는 것은 "시험 점수에 따라 등급 부여"
    "selection.xhtml": "B", // 선택 구조를 사용해야 하는 상황은 "온도가 0도 미만이면 외출 시 코트 착용하기"
    "repetition.xhtml": "C", // 반복 구조가 필요한 작업은 "1부터 100까지의 짝수 합 구하기"
  }

  function handleClick(e) {
    // 현재 페이지 파일명 가져오기
    const path = window.location.pathname
    const page = path.substring(path.lastIndexOf("/") + 1)

    // 현재 페이지에 맞는 정답 가져오기
    const correct = answers[page]

    // 피드백 메시지 표시
    const feedback = e.target.parentNode.querySelector(".feedback")

    // 모든 버튼과 스타일 초기화
    const buttons = e.target.parentNode.querySelectorAll("button")
    buttons.forEach((btn) => {
      btn.disabled = false
      btn.style.borderColor = "#0076ff"
      btn.style.backgroundColor = "#fff"
    })
    feedback.textContent = ""
    feedback.style.color = ""

    // 정답 여부 확인
    if (e.target.dataset.answer === correct) {
      feedback.textContent = "정답입니다! 🎉"
      feedback.style.color = "#16a34a" // 녹색
      // 정답 버튼만 강조, 모든 버튼 비활성화
      buttons.forEach((btn) => {
        btn.disabled = true
        if (btn.dataset.answer === correct) {
          btn.style.borderColor = "#16a34a"
          btn.style.backgroundColor = "#eaffea"
        }
      })
    } else {
      feedback.textContent = "틀렸습니다. 다시 한번 생각해보세요."
      feedback.style.color = "#dc2626" // 빨간색
      // 오답이면 모든 버튼 다시 선택 가능, 스타일 초기화
    }
  }

  // 페이지 로드 시 모든 퀴즈 버튼에 이벤트 리스너 추가
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".quiz button").forEach((btn) => btn.addEventListener("click", handleClick))
  })
})()
