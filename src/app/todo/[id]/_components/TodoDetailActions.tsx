import Button from "@/compoents/common/Button/Button";
import Input from "@/compoents/common/Input/Input";
import Image from "next/image";

interface TodoDetailActionsProps {
    value: string;
    memo: string | undefined;
    uploadImgUrl?: string | null;
    todoImgUrl?: string;
    actions: {
        onChangeMemo: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
        onDelete: () => void;
        onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
        onUpdateTodo: () => void;
    };
    loading: {
        removeLoading: boolean;
        updateLoading: boolean;
        uploadLoading: boolean;
    };
}

// 상세 페이지에서 이미지 업로드, 메모 수정, 삭제 액션을 담당하는 컴포넌트
export default function TodoDetailActions({
    value,
    memo,
    uploadImgUrl,
    todoImgUrl,
    actions: { onChangeMemo, onDelete, onImageUpload, onUpdateTodo },
    loading: { removeLoading, updateLoading, uploadLoading },
}: TodoDetailActionsProps) {
    return (
        <article className="px-4 tablet:px-4 laptop:px-0 desktop:px-0">
            <div className="grid grid-cols-1 laptop:grid-cols-2 gap-4 desktop:gap-6 w-full mt-6">
                <div className="relative w-full aspect-[400/311] desktop:aspect-[588/311] flex flex-col items-center justify-center bg-[#f8fafc] border border-dashed border-slate-300 rounded-3xl">
                    {uploadImgUrl || todoImgUrl ? (
                        <Image
                            src={uploadImgUrl || todoImgUrl || "/assets/icons/img.svg"}
                            alt="업로드 미리보기"
                            fill
                            className="absolute inset-0 w-full h-full object-contain rounded-3xl z-10"
                        />
                    ) : (
                        <Image src="/assets/icons/img.svg" width={64} height={64} alt="img" className="mb-2 z-10" />
                    )}
                    <Button
                        mode="detail"
                        color="primary"
                        ariaLabel="이미지 업로드"
                        disabled={uploadLoading}
                        className={`absolute bottom-6 right-6 w-16 h-16 rounded-full z-20
                             ${
                                 uploadImgUrl || todoImgUrl
                                     ? " !border-2 !border-[var(--color-slate900)] !bg-[rgba(15,23,42,0.5)]"
                                     : ""
                             }
                                    `}
                    >
                        <Image
                            src={
                                uploadImgUrl || todoImgUrl
                                    ? "/assets/icons/edit.svg"
                                    : "/assets/icons/Property1=Variant2.svg"
                            }
                            width={24}
                            height={24}
                            alt="이미지 업로드"
                        />
                    </Button>
                    <Input
                        type="file"
                        accpt={true}
                        onChange={onImageUpload}
                        disabled={uploadLoading}
                        className={`absolute bottom-6 right-6 w-16 h-16 opacity-0 z-30 ${
                            uploadLoading ? "pointer-events-none" : "cursor-pointer"
                        }`}
                    />
                </div>

                <div className="relative w-full aspect-[400/311] desktop:aspect-[588/311] rounded-3xl overflow-hidden">
                    <Image
                        src="/assets/icons/memo.svg"
                        alt="메모"
                        fill
                        className="object-cover select-none pointer-events-none"
                    />
                    <div className="absolute inset-0 z-10 flex flex-col p-4 laptop:p-6">
                        <h2 className="text-center text-[#92400E] font-bold mb-4">Memo</h2>
                        <textarea
                            value={value !== "" ? value : memo || ""}
                            onChange={onChangeMemo}
                            placeholder="메모를 입력하세요"
                            className="flex-1 w-full resize-none bg-transparent text-slate-800 text-[16px] text-center
                  focus:outline-none overflow-y-auto
                  [&::-webkit-scrollbar]:w-[4px]
                  [&::-webkit-scrollbar-thumb]:bg-[#FDE68A]
                  [&::-webkit-scrollbar-thumb]:rounded-[4px]"
                        />
                    </div>
                </div>
            </div>
            <div className=" flex gap-2 mt-6 justify-center  desktop:justify-end  ">
                <Button
                    mode="detail"
                    disabled={value.trim().length === 0 || updateLoading}
                    color={value.trim().length === 0 ? "primary" : "success"}
                    ariaLabel="메모 수정"
                    size="lg"
                    onClick={onUpdateTodo}
                >
                    <Image src="/assets/icons/check.svg" width={16} height={16} alt="수정 완료" />
                    수정 완료
                </Button>
                <Button
                    mode="detail"
                    disabled={removeLoading}
                    ariaLabel="Todo 삭제"
                    color="danger"
                    size="lg"
                    className="text-white"
                    onClick={onDelete}
                >
                    <Image src="/assets/icons/x.svg" width={16} height={16} alt="삭제" />
                    삭제 하기
                </Button>
            </div>
        </article>
    );
}
