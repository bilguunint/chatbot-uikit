"use client";

export default function UserBubble({ content }: { content: string }) {
  return (
    <div className="flex justify-end animate-slide-up">
      <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-br-md bg-gradient-to-r from-primary-500 to-primary-600 text-white text-[14px] leading-relaxed shadow-sm">
        {content}
      </div>
    </div>
  );
}
