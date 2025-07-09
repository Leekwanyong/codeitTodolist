# Codeit TodoList

## 소개

Codeit TodoList는 할 일 관리에 최적화된 투두리스트 웹 애플리케이션입니다. 직관적인 UI와 반응형 디자인, 강력한 공용 컴포넌트 시스템을 갖추고 있습니다.

## 주요 기능

-   할 일 목록 조회, 추가, 수정, 삭제
-   할 일 완료/미완료 상태 토글
-   할 일 상세 정보(메모, 이미지 첨부 등) 관리
-   반응형 웹 지원(모바일/태블릿/데스크탑)
-   재사용 가능한 공용 UI 컴포넌트

## 기술 스택

-   **Next.js** (App Router)
-   **TypeScript**
-   **React**
-   **Tailwind CSS**
-   **ESLint/Prettier**

## 폴더 구조

```
todolist/
├── public/           # 정적 파일 및 이미지
├── src/
│   ├── lib/          # API 함수
│   ├── app/          # 페이지 및 레이아웃
│   ├── compoents/    # 공용 컴포넌트
│   ├── hooks/        # 커스텀 훅
│   └── types/        # 타입 정의
├── package.json
├── README.md
└── ...
```

## 설치 및 실행 방법

1. 저장소 클론
    ```bash
    git clone [저장소 주소]
    cd todolist
    ```
2. 패키지 설치
    ```bash
    npm install
    ```
3. 개발 서버 실행
    ```bash
    npm run dev
    ```
4. 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속
