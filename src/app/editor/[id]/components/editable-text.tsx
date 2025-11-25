import { useRef, useEffect, useState } from "react";
import type { CanvasElement } from "@/hooks/use-canvas-selection";
import * as Icons from "lucide-react";

interface EditableTextProps {
  element: CanvasElement;
  isSelected: boolean;
  isEditing: boolean;
  onSelect: () => void;
  onDoubleClick: () => void;
  onUpdate: (content: string) => void;
  onStopEditing: () => void;
  className?: string;
  as?: "h1" | "h2" | "p" | "span" | "button";
}

export function EditableText({
  element,
  isSelected,
  isEditing,
  onSelect,
  onDoubleClick,
  onUpdate,
  onStopEditing,
  className = "",
  as: Component = "p",
}: EditableTextProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [editValue, setEditValue] = useState(element.content);
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    setEditValue(element.content);
  }, [element.content]);

  // Atualiza largura quando editValue muda
  useEffect(() => {
    if (measureRef.current && Component === "button") {
      setTextWidth(measureRef.current.offsetWidth);
    }
  }, [editValue, Component, isEditing]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();

      // Auto-resize textarea para fit content
      if (Component !== "button") {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height =
          textareaRef.current.scrollHeight + "px";
      } else {
        // Para buttons, ajusta largura inicial
        textareaRef.current.style.width = "1px";
        textareaRef.current.style.width = `${textareaRef.current.scrollWidth}px`;
      }
    }
  }, [isEditing, Component]);

  const handleBlur = () => {
    console.log("handleBlur - editValue:", editValue);
    console.log("handleBlur - element.content:", element.content);
    onUpdate(editValue);
    onStopEditing();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isEditing) {
      // Permite Enter para quebra de linha
      if (e.key === "Escape") {
        e.preventDefault();
        setEditValue(element.content); // Restaura valor original
        onStopEditing();
      }
      // Stoppa propagação para não interferir com canvas shortcuts
      e.stopPropagation();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setEditValue(newValue);

    // Para buttons, ajusta largura instantaneamente baseado no scrollWidth
    if (Component === "button") {
      e.target.style.width = "1px";
      e.target.style.width = `${e.target.scrollWidth}px`;
    }

    // Auto-resize textarea (exceto para buttons)
    if (Component !== "button") {
      e.target.style.height = "auto";
      e.target.style.height = e.target.scrollHeight + "px";
    }
  };

  // Usa div ao invés de button quando for button para manter estilos consistentes
  const ActualComponent = Component === "button" ? "div" : Component;

  // Renderiza ícone se for botão e tiver ícone definido
  const renderIcon = () => {
    if (Component !== "button" || !element.icon) return null;
    const IconComponent = Icons[element.icon as keyof typeof Icons] as any;
    if (!IconComponent) return null;
    const size = element.iconSize || 16;
    return (
      <IconComponent style={{ width: `${size}px`, height: `${size}px` }} />
    );
  };

  const iconPosition = element.iconPosition || "left";
  const showIcon = Component === "button" && element.icon;

  // Se está editando, mostra textarea inline
  if (isEditing) {
    const textareaStyle: React.CSSProperties = {
      fontFamily: "inherit",
      fontSize: "inherit",
      fontWeight: "inherit",
      color: "inherit",
      textAlign: "inherit",
      lineHeight: "inherit",
      padding: "0",
      margin: "0",
    };

    // Para buttons, mantém altura fixa e não quebra linha
    if (Component === "button") {
      textareaStyle.height = "1.5em";
      textareaStyle.whiteSpace = "nowrap";
      textareaStyle.overflow = "hidden";
    } else {
      textareaStyle.minHeight = "1.5em";
      textareaStyle.width = "100%";
    }

    return (
      <ActualComponent
        id={element.id}
        className={`${className} ${isSelected ? "outline outline-2 outline-primary outline-offset-2" : ""}`}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          display: Component === "button" ? "inline-flex" : "block",
          alignItems: Component === "button" ? "center" : undefined,
          justifyContent: Component === "button" ? "center" : undefined,
          gap: showIcon ? "0.5rem" : undefined,
        }}
      >
        {showIcon && iconPosition === "left" && renderIcon()}
        {/* Span invisível para medir largura real do texto */}
        <span
          ref={measureRef}
          className="absolute opacity-0 pointer-events-none whitespace-nowrap"
          style={{
            fontFamily: "inherit",
            fontSize: "inherit",
            fontWeight: "inherit",
          }}
        >
          {editValue || " "}
        </span>
        <textarea
          ref={textareaRef}
          value={editValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          className="resize-none overflow-hidden border-0 focus:outline-none bg-transparent text-center"
          style={textareaStyle}
        />
        {showIcon && iconPosition === "right" && renderIcon()}
      </ActualComponent>
    );
  }

  // Caso contrário, renderiza o elemento normal
  return (
    <ActualComponent
      id={element.id}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onDoubleClick();
      }}
      className={`${className} ${
        isSelected ? "outline outline-2 outline-primary outline-offset-2" : ""
      } cursor-pointer transition-all whitespace-pre-wrap`}
      style={{
        userSelect: "none",
        display: showIcon ? "inline-flex" : undefined,
        alignItems: showIcon ? "center" : undefined,
        gap: showIcon ? "0.5rem" : undefined,
      }}
    >
      {showIcon && iconPosition === "left" && renderIcon()}
      {element.content || "Clique para editar"}
      {showIcon && iconPosition === "right" && renderIcon()}
    </ActualComponent>
  );
}
