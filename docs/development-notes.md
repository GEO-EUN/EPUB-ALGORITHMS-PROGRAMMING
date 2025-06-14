
## 🛠️ 개발노트

1. **ChatGPT로 기본 PRD 구성**
   - ChatGPT를 활용해 전자책 프로젝트의 PRD(제품 요구사항 명세서) 초안 작성

2. **https://v0.dev 에서 ChatGPT로 만든 PRD로 전자책 기본 프로젝트 및 하이브리드 기능 구성 후 프로젝트 다운로드**
   - v0.dev에서 PRD 기반으로 전자책 및 하이브리드 웹 프로젝트 자동 생성
   - 생성된 프로젝트를 로컬로 다운로드하여 개발 시작

3. **https://notebooklm.google.com/ 에서 비상교육_정보_교과서_3단원 문제해결과 프로그래밍 요약**
   - NotebookLM에서 교과서 3단원(문제해결과 프로그래밍) 주요 내용을 요약 정리
   - 요약본을 전자책 콘텐츠 설계에 반영
   - 오디오북(algobook.mp3)을 notebooklm에서 생성하여 활용

4. **Cursor AI에서 v0.dev에서 만든 프로젝트, notebooklm에서 요약한 내용으로 전자책 페이지 개발**
   - Cursor AI(코드 어시스턴트)로 v0.dev 프로젝트와 notebooklm 요약본을 바탕으로 각 전자책 페이지(xhtml, js, css 등) 개발
   - 알고리즘의 순차 구조, 반복 구조, 선택 구조를 인터랙티브 기능으로 시뮬레이션 구현
   - Q&A는 직접 구성한 [Padlet Q&A 보드](https://padlet.com/AI_InfoCom_Dev_Teacher/ai-xmju3laff0on2zqe)를 페이지 내에 포함

5. **프로그래밍 실습 페이지에 오디오북, 플립북, [Scratch(mit.edu)](https://scratch.mit.edu/)에 직접 작성한 프로젝트(실습코드 실행영역)를 추가**
   - 실습 페이지에서 오디오북, 플립북, Scratch 실습코드 실행영역을 통합 제공
   
6. **7-Zip 설치 후 EPUB 실행 파일 생성**
   - 7-Zip을 설치하여 EPUB 표준에 맞게 mimetype 무압축, META-INF/OEBPS 압축 방식으로 전자책 패키징
   - Sigil 등 EPUB 리더에서 정상 실행 및 검증