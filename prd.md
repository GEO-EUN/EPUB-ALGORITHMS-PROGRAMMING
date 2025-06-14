# EPUB 문제 해결과 프로그래밍 PRD (2024-06 최신)

## 1. 프로젝트 개요
- **프로젝트명**: 알고리즘 기초 전자책
- **목적**: 초중급 학습자를 위한 알고리즘 기초 개념 학습
- **형식**: EPUB 전자책
- **대상 독자**: 프로그래밍 입문자, 알고리즘 기초 학습자

## 2. 콘텐츠 구성
### 2.1 주요 섹션
1. **순차 구조**
2. **반복 구조**
3. **선택 구조**
4. **프로그래밍 실습(Flip-Audio Book)**
5. **질문과 답변(Q&A, Padlet 연동)**
6. **기초 개념(문제해결, 알고리즘 설계, 변수/제어구조, 실생활 적용)**

### 2.2 각 섹션별 구성 요소
- 텍스트 설명, 이미지/다이어그램, 코드 예제, 실습 문제, 오디오, 퀴즈, 시뮬레이션, 결과 비교, UX 개선

## 3. 기술적 요구사항
### 3.1 실제 파일/폴더 구조
```
OEBPS/
├── xhtml/
│   ├── index.xhtml
│   ├── sequential.xhtml
│   ├── repetition.xhtml
│   ├── selection.xhtml
│   ├── programing.xhtml
│   ├── qna.xhtml
│   ├── page1.xhtml ~ page5.xhtml
├── css/
│   ├── style.css
│   └── index.css
├── styles/
│   ├── selection.css
│   └── repetition.css
├── js/
│   ├── quiz.js
│   └── visualization.js
├── images/
│   ├── flow_seq.svg, flow_sel.svg, flow_rep.svg, flowchart_seq.svg, ...
│   └── 기타 다이어그램/아이콘
├── audio/
│   └── algobook.mp3
├── nav.xhtml (목차)
├── content.opf
META-INF/
├── container.xml
mimetype
```

### 3.2 주요 구현/구조 특징
- **모든 페이지 상단 nav에 '홈' 오른쪽에 '목차' 메뉴 추가** (nav.xhtml로 이동)
- **nav.xhtml**: 표지/개념/실습/질문 등 모든 주요 페이지로 이동 가능, 불릿/숫자/밑줄 없는 텍스트 링크로 구성
- **목차(nav.xhtml) 링크 밑줄 제거**: CSS 및 인라인 스타일로 모든 뷰어에서 밑줄 미표시 보장
- **index.css**: 목차 및 표지 등 본문 스타일 담당, style.css는 본문 공통 스타일
- **파일명은 모두 ASCII, 폴더 구조 명확히 분리**
- **모든 리소스(이미지, 오디오, 스타일, 스크립트)는 content.opf/manifest/spine에 반영**
- **EPUB 3.0 표준, META-INF/container.xml, mimetype 무압축**
- **7-Zip으로 mimetype만 무압축, 나머지 압축하여 패키징**

## 4. 디자인/UX 가이드
- 반응형, 모바일 우선, 가독성, 카드형 결과 비교, 컬러/폰트 일관성, UX 개선(입력란, 버튼, 결과 정렬 등)
- 시뮬레이션 입력란은 상단 입력/테스트케이스/실행 버튼으로만 값 반영, 결과 컬럼 중앙정렬
- 목차(nav.xhtml)는 카드형 중앙 배치, 링크 밑줄/불릿/숫자 없음, 클릭 시 각 섹션 이동

## 5. 기능 요구사항
- 페이지 네비게이션, 목차(nav.xhtml), 실시간 퀴즈, 코드 실행 결과, 오디오, Padlet Q&A, 결과 비교, 접근성(스크린리더, 키보드, 고대비, 폰트조절)
- 공통 메뉴(nav)에서 모든 주요 섹션으로 이동 가능

## 6. 품질/테스트/배포
- EPUB 3.0 표준, 크로스 플랫폼, 성능 최적화, 오류 없는 실행, EPUB Validator, 다양한 리더 테스트, 정기 업데이트, 시맨틱 버저닝

## 7. 기타
- styles/selection.css, styles/repetition.css 등 분리 적용
- 오디오북, 실시간 Q&A(Padlet), 시뮬레이션, 결과 비교 등 최신 기능 반영
- 최신 구조/스타일/네비게이션/패키징 방식 반영 (2024-06) 