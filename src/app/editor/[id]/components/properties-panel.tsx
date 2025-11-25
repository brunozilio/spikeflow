"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChevronDown,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Columns,
  Rows,
  Grid,
  Eye,
  ArrowRight,
  Check,
  X,
  Plus,
  Minus,
  Search,
  Home,
  User,
  Settings,
  Mail,
  Phone,
  Calendar,
  Download,
  Upload,
  Heart,
  Star,
  Clock,
  type LucideIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import type { CanvasElement } from "@/hooks/use-canvas-selection";

interface PropertiesPanelProps {
  selectedElement: CanvasElement | null;
  onUpdateElement: (updates: Partial<CanvasElement>) => void;
}

export function PropertiesPanel({
  selectedElement,
  onUpdateElement,
}: PropertiesPanelProps) {
  const [textAlign, setTextAlign] = useState<
    "left" | "center" | "right" | "justify"
  >("center");
  const [fontFamily, setFontFamily] = useState("inter");
  const [fontWeight, setFontWeight] = useState("400");
  const [fontSize, setFontSize] = useState("14");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [paddingX, setPaddingX] = useState("0");
  const [paddingY, setPaddingY] = useState("0");
  const [marginX, setMarginX] = useState("0");
  const [marginY, setMarginY] = useState("0");
  const [buttonIcon, setButtonIcon] = useState<string | null>(null);
  const [iconPosition, setIconPosition] = useState<"left" | "right">("left");
  const [iconSize, setIconSize] = useState(16);

  useEffect(() => {
    if (selectedElement) {
      // Carrega ícone e posição do elemento
      setButtonIcon(selectedElement.icon || null);
      setIconPosition(selectedElement.iconPosition || "left");
      setIconSize(selectedElement.iconSize || 16);
      const element = document.getElementById(selectedElement.id);
      if (element) {
        const styles = window.getComputedStyle(element);
        const currentAlign = styles.textAlign as
          | "left"
          | "center"
          | "right"
          | "justify";

        // Lê padding e margin
        const pLeft = parseInt(styles.paddingLeft) || 0;
        const pRight = parseInt(styles.paddingRight) || 0;
        const pTop = parseInt(styles.paddingTop) || 0;
        const pBottom = parseInt(styles.paddingBottom) || 0;
        const mLeft = parseInt(styles.marginLeft) || 0;
        const mRight = parseInt(styles.marginRight) || 0;
        const mTop = parseInt(styles.marginTop) || 0;
        const mBottom = parseInt(styles.marginBottom) || 0;

        // Assume que X é left/right e Y é top/bottom
        setPaddingX(((pLeft + pRight) / 2).toString());
        setPaddingY(((pTop + pBottom) / 2).toString());
        setMarginX(((mLeft + mRight) / 2).toString());
        setMarginY(((mTop + mBottom) / 2).toString());
        setTextAlign(currentAlign || "center");

        const currentFamily = styles.fontFamily.toLowerCase();
        if (currentFamily.includes("inter")) setFontFamily("inter");
        else if (currentFamily.includes("roboto")) setFontFamily("roboto");

        setFontWeight(styles.fontWeight);
        setFontSize(parseInt(styles.fontSize).toString());

        // Lê o background - prioriza inline style, depois computed
        let bgValue = element.style.background || element.style.backgroundColor;

        if (!bgValue) {
          // Se não tem inline style, usa o computedStyle
          bgValue = styles.background;
        }

        // Extrai a primeira cor RGB encontrada (funciona para gradient e cor sólida)
        const rgbMatch = bgValue.match(/rgba?\((\d+),?\s*(\d+),?\s*(\d+)/);
        if (rgbMatch) {
          const hex = `#${parseInt(rgbMatch[1]).toString(16).padStart(2, "0")}${parseInt(rgbMatch[2]).toString(16).padStart(2, "0")}${parseInt(rgbMatch[3]).toString(16).padStart(2, "0")}`;
          setBackgroundColor(hex.toUpperCase());
        } else if (bgValue.startsWith("#")) {
          // Se já for hex
          setBackgroundColor(bgValue.toUpperCase());
        }
      }
    }
  }, [selectedElement]);

  const handleTextAlignChange = (
    align: "left" | "center" | "right" | "justify",
  ) => {
    setTextAlign(align);
    if (selectedElement) {
      const element = document.getElementById(selectedElement.id);
      if (element) {
        element.style.textAlign = align;
      }
    }
  };

  const handleFontFamilyChange = (family: string) => {
    setFontFamily(family);
    if (selectedElement) {
      const element = document.getElementById(selectedElement.id);
      if (element) {
        element.style.fontFamily = family;
      }
    }
  };

  const handleFontWeightChange = (weight: string) => {
    setFontWeight(weight);
    if (selectedElement) {
      const element = document.getElementById(selectedElement.id);
      if (element) {
        element.style.fontWeight = weight;
      }
    }
  };

  const handleFontSizeChange = (size: string) => {
    setFontSize(size);
    if (selectedElement) {
      const element = document.getElementById(selectedElement.id);
      if (element) {
        element.style.fontSize = `${size}px`;
      }
    }
  };

  const handleBackgroundColorChange = (color: string) => {
    setBackgroundColor(color);
    if (selectedElement) {
      const element = document.getElementById(selectedElement.id);
      if (element) {
        // Use background ao invés de backgroundColor para sobrescrever gradients
        element.style.background = color;
      }
    }
  };

  return (
    <div className="w-80 bg-zinc-900 border-l border-zinc-800 overflow-y-auto">
      <div className="p-4 border-b border-zinc-800">
        <Tabs defaultValue="design" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-zinc-800">
            <TabsTrigger value="design">Design</TabsTrigger>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex-1 flex">
                    <TabsTrigger
                      value="interaction"
                      disabled
                      className="opacity-50 cursor-not-allowed w-full pointer-events-auto"
                    >
                      Interação
                    </TabsTrigger>
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    <span className="text-xs">Em breve</span>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex-1 flex">
                    <TabsTrigger
                      value="backend"
                      disabled
                      className="opacity-50 cursor-not-allowed w-full pointer-events-auto"
                    >
                      Backend
                    </TabsTrigger>
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    <span className="text-xs">Em breve</span>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </TabsList>
        </Tabs>
      </div>

      {/* Frame apenas para button e div */}
      {selectedElement &&
        (selectedElement.type === "button" ||
          selectedElement.type === "div") && (
          <PropertySection title="Frame" defaultOpen>
            <div className="space-y-4">
              <div>
                <Label className="text-xs text-zinc-400 mb-2 block">
                  Cor de Fundo
                </Label>
                <BackgroundColorPicker
                  selectedElement={selectedElement}
                  color={backgroundColor}
                  onChange={handleBackgroundColorChange}
                />
              </div>

              {/* Padding e Margin para button e div */}
              <div>
                <Label className="text-xs text-zinc-400 mb-2 block">
                  Padding
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs text-zinc-500 mb-1 block">
                      Horizontal
                    </Label>
                    <Input
                      type="number"
                      value={paddingX}
                      className="bg-zinc-800 border-zinc-700 text-white"
                      onChange={(e) => {
                        setPaddingX(e.target.value);
                        const element = document.getElementById(
                          selectedElement.id,
                        );
                        if (element) {
                          element.style.paddingLeft = e.target.value + "px";
                          element.style.paddingRight = e.target.value + "px";
                        }
                      }}
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-zinc-500 mb-1 block">
                      Vertical
                    </Label>
                    <Input
                      type="number"
                      value={paddingY}
                      className="bg-zinc-800 border-zinc-700 text-white"
                      onChange={(e) => {
                        setPaddingY(e.target.value);
                        const element = document.getElementById(
                          selectedElement.id,
                        );
                        if (element) {
                          element.style.paddingTop = e.target.value + "px";
                          element.style.paddingBottom = e.target.value + "px";
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-xs text-zinc-400 mb-2 block">
                  Margin
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs text-zinc-500 mb-1 block">
                      Horizontal
                    </Label>
                    <Input
                      type="number"
                      value={marginX}
                      className="bg-zinc-800 border-zinc-700 text-white"
                      onChange={(e) => {
                        setMarginX(e.target.value);
                        const element = document.getElementById(
                          selectedElement.id,
                        );
                        if (element) {
                          element.style.marginLeft = e.target.value + "px";
                          element.style.marginRight = e.target.value + "px";
                        }
                      }}
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-zinc-500 mb-1 block">
                      Vertical
                    </Label>
                    <Input
                      type="number"
                      value={marginY}
                      className="bg-zinc-800 border-zinc-700 text-white"
                      onChange={(e) => {
                        setMarginY(e.target.value);
                        const element = document.getElementById(
                          selectedElement.id,
                        );
                        if (element) {
                          element.style.marginTop = e.target.value + "px";
                          element.style.marginBottom = e.target.value + "px";
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </PropertySection>
        )}

      {/* Seção de Ícone apenas para botões */}
      {selectedElement && selectedElement.type === "button" && (
        <PropertySection title="Ícone" defaultOpen>
          <div className="space-y-4">
            <div>
              <Label className="text-xs text-zinc-400 mb-2 block">
                Selecionar Ícone
              </Label>
              <Select
                value={buttonIcon || "none"}
                onValueChange={(value) => {
                  const newIcon = value === "none" ? null : value;
                  setButtonIcon(newIcon);
                  onUpdateElement({ icon: newIcon });
                }}
              >
                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue placeholder="Nenhum" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Nenhum</SelectItem>
                  <SelectItem value="ArrowRight">Seta Direita</SelectItem>
                  <SelectItem value="Check">Check</SelectItem>
                  <SelectItem value="X">X</SelectItem>
                  <SelectItem value="Plus">Mais</SelectItem>
                  <SelectItem value="Minus">Menos</SelectItem>
                  <SelectItem value="Search">Buscar</SelectItem>
                  <SelectItem value="Home">Casa</SelectItem>
                  <SelectItem value="User">Usuário</SelectItem>
                  <SelectItem value="Settings">Configurações</SelectItem>
                  <SelectItem value="Mail">Email</SelectItem>
                  <SelectItem value="Phone">Telefone</SelectItem>
                  <SelectItem value="Calendar">Calendário</SelectItem>
                  <SelectItem value="Download">Download</SelectItem>
                  <SelectItem value="Upload">Upload</SelectItem>
                  <SelectItem value="Heart">Coração</SelectItem>
                  <SelectItem value="Star">Estrela</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {buttonIcon && (
              <div>
                <Label className="text-xs text-zinc-400 mb-2 block">
                  Posição do Ícone
                </Label>
                <div className="flex gap-2">
                  <Button
                    variant={iconPosition === "left" ? "default" : "outline"}
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      setIconPosition("left");
                      onUpdateElement({ iconPosition: "left" });
                    }}
                  >
                    Esquerda
                  </Button>
                  <Button
                    variant={iconPosition === "right" ? "default" : "outline"}
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      setIconPosition("right");
                      onUpdateElement({ iconPosition: "right" });
                    }}
                  >
                    Direita
                  </Button>
                </div>
              </div>
            )}

            {buttonIcon && (
              <div>
                <Label className="text-xs text-zinc-400 mb-2 block">
                  Tamanho do Ícone
                </Label>
                <Select
                  value={iconSize.toString()}
                  onValueChange={(value) => {
                    const size = parseInt(value);
                    setIconSize(size);
                    onUpdateElement({ iconSize: size });
                  }}
                >
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12px</SelectItem>
                    <SelectItem value="14">14px</SelectItem>
                    <SelectItem value="16">16px</SelectItem>
                    <SelectItem value="18">18px</SelectItem>
                    <SelectItem value="20">20px</SelectItem>
                    <SelectItem value="24">24px</SelectItem>
                    <SelectItem value="28">28px</SelectItem>
                    <SelectItem value="32">32px</SelectItem>
                    <SelectItem value="36">36px</SelectItem>
                    <SelectItem value="40">40px</SelectItem>
                    <SelectItem value="48">48px</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </PropertySection>
      )}

      {/* Tipografia para todos exceto div (frame) */}
      {selectedElement && selectedElement.type !== "div" && (
        <PropertySection title="Tipografia" defaultOpen>
          <div className="space-y-4">
            <div>
              <Label className="text-xs text-zinc-400 mb-2 block">
                Família da Fonte
              </Label>
              <Select value={fontFamily} onValueChange={handleFontFamilyChange}>
                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inter">Inter</SelectItem>
                  <SelectItem value="roboto">Roboto</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-zinc-400 mb-2 block">Peso</Label>
                <Select
                  value={fontWeight}
                  onValueChange={handleFontWeightChange}
                >
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="300">Leve</SelectItem>
                    <SelectItem value="400">Regular</SelectItem>
                    <SelectItem value="500">Médio</SelectItem>
                    <SelectItem value="600">Semi-negrito</SelectItem>
                    <SelectItem value="700">Negrito</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-zinc-400 mb-2 block">
                  Tamanho
                </Label>
                <Select value={fontSize} onValueChange={handleFontSizeChange}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12</SelectItem>
                    <SelectItem value="14">14</SelectItem>
                    <SelectItem value="16">16</SelectItem>
                    <SelectItem value="18">18</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="24">24</SelectItem>
                    <SelectItem value="32">32</SelectItem>
                    <SelectItem value="48">48</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-xs text-zinc-400 mb-2 block">Cor</Label>
              <ColorPicker selectedElement={selectedElement} />
            </div>

            <div>
              <Label className="text-xs text-zinc-400 mb-2 block">
                Alinhamento do Texto
              </Label>
              <div className="flex gap-1">
                <IconButton
                  icon={AlignLeft}
                  active={textAlign === "left"}
                  onClick={() => handleTextAlignChange("left")}
                />
                <IconButton
                  icon={AlignCenter}
                  active={textAlign === "center"}
                  onClick={() => handleTextAlignChange("center")}
                />
                <IconButton
                  icon={AlignRight}
                  active={textAlign === "right"}
                  onClick={() => handleTextAlignChange("right")}
                />
                <IconButton
                  icon={AlignJustify}
                  active={textAlign === "justify"}
                  onClick={() => handleTextAlignChange("justify")}
                />
              </div>
            </div>
          </div>
        </PropertySection>
      )}
    </div>
  );
}

function PropertySection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-zinc-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-4 text-white font-medium hover:bg-zinc-800/50"
      >
        <span className="text-sm">{title}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? "" : "-rotate-90"}`}
        />
      </button>
      {isOpen && <div className="p-4 pt-0">{children}</div>}
    </div>
  );
}

function IconButton({
  icon: Icon,
  active = false,
  onClick,
}: {
  icon: React.ElementType;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className={`h-9 w-9 ${
        active
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "text-zinc-400 hover:text-white"
      }`}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
}

function BackgroundColorPicker({
  selectedElement,
  color,
  onChange,
}: {
  selectedElement: CanvasElement | null;
  color: string;
  onChange: (color: string) => void;
}) {
  const [opacity, setOpacity] = useState(100);

  useEffect(() => {
    if (selectedElement) {
      const element = document.getElementById(selectedElement.id);
      if (element) {
        const styles = window.getComputedStyle(element);
        const bgColor = styles.backgroundColor;
        const rgb = bgColor.match(/(\d+(\.\d+)?)/g);
        if (rgb && rgb.length >= 4) {
          const alphaValue = parseFloat(rgb[3]);
          setOpacity(Math.round(alphaValue * 100));
        } else {
          setOpacity(100);
        }
      }
    }
  }, [selectedElement?.id]);

  const applyBackgroundColor = (newColor: string, newOpacity: number) => {
    if (!selectedElement) return;
    const element = document.getElementById(selectedElement.id);
    if (!element) return;

    const r = parseInt(newColor.slice(1, 3), 16);
    const g = parseInt(newColor.slice(3, 5), 16);
    const b = parseInt(newColor.slice(5, 7), 16);
    const a = newOpacity / 100;

    element.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  const handleColorChange = (newColor: string) => {
    onChange(newColor);
    applyBackgroundColor(newColor, opacity);
  };

  const handleOpacityChange = (newOpacity: number) => {
    setOpacity(newOpacity);
    applyBackgroundColor(color, newOpacity);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <label className="relative w-8 h-8 cursor-pointer">
          <div
            className="w-8 h-8 rounded border border-zinc-700 hover:border-zinc-500 transition-colors"
            style={{ backgroundColor: color }}
          />
          <input
            type="color"
            value={color}
            onChange={(e) => handleColorChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </label>
        <Input
          value={color.replace("#", "")}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9A-Fa-f]/g, "");
            if (value.length <= 6) {
              handleColorChange(`#${value}`);
            }
          }}
          onBlur={(e) => {
            const value = e.target.value.replace(/[^0-9A-Fa-f]/g, "");
            if (value.length === 6) {
              handleColorChange(`#${value}`);
            }
          }}
          className="flex-1 bg-zinc-800 border-zinc-700 text-white"
          maxLength={6}
        />
      </div>
      <div className="flex items-center gap-2">
        <Label className="text-xs text-zinc-400 w-16">Opacidade</Label>
        <input
          type="range"
          min="0"
          max="100"
          value={opacity}
          onChange={(e) => handleOpacityChange(Number(e.target.value))}
          className="flex-1"
        />
        <span className="text-xs text-zinc-400 w-10 text-right">
          {opacity}%
        </span>
      </div>
    </div>
  );
}

function ColorPicker({
  selectedElement,
}: {
  selectedElement: CanvasElement | null;
}) {
  const [color, setColor] = useState("#FFFFFF");
  const [opacity, setOpacity] = useState(100);

  useEffect(() => {
    if (selectedElement) {
      const element = document.getElementById(selectedElement.id);
      if (element) {
        const styles = window.getComputedStyle(element);
        const computedColor = styles.color;
        const rgb = computedColor.match(/(\d+(\.\d+)?)/g);
        if (rgb && rgb.length >= 3) {
          const hex = `#${parseInt(rgb[0]).toString(16).padStart(2, "0")}${parseInt(rgb[1]).toString(16).padStart(2, "0")}${parseInt(rgb[2]).toString(16).padStart(2, "0")}`;
          setColor(hex.toUpperCase());
          // Tenta pegar a opacidade se existir
          if (rgb.length >= 4) {
            const alphaValue = parseFloat(rgb[3]);
            setOpacity(Math.round(alphaValue * 100));
          } else {
            setOpacity(100);
          }
        }
      }
    }
  }, [selectedElement?.id]);

  const applyColor = (newColor: string, newOpacity: number) => {
    if (!selectedElement) return;
    const element = document.getElementById(selectedElement.id);
    if (!element) return;

    // Converte hex para RGB
    const r = parseInt(newColor.slice(1, 3), 16);
    const g = parseInt(newColor.slice(3, 5), 16);
    const b = parseInt(newColor.slice(5, 7), 16);
    const a = newOpacity / 100;

    element.style.color = `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    applyColor(newColor, opacity);
  };

  const handleOpacityChange = (newOpacity: number) => {
    setOpacity(newOpacity);
    applyColor(color, newOpacity);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <label className="relative w-8 h-8 cursor-pointer">
          <div
            className="w-8 h-8 rounded border border-zinc-700 hover:border-zinc-500 transition-colors"
            style={{ backgroundColor: color }}
          />
          <input
            type="color"
            value={color}
            onChange={(e) => handleColorChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </label>
        <Input
          value={color.replace("#", "")}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9A-Fa-f]/g, "");
            if (value.length <= 6) {
              handleColorChange(`#${value}`);
            }
          }}
          onBlur={(e) => {
            const value = e.target.value.replace(/[^0-9A-Fa-f]/g, "");
            if (value.length === 6) {
              handleColorChange(`#${value}`);
            }
          }}
          className="flex-1 bg-zinc-800 border-zinc-700 text-white"
          maxLength={6}
        />
      </div>
      <div className="flex items-center gap-2">
        <Label className="text-xs text-zinc-400 w-16">Opacidade</Label>
        <input
          type="range"
          min="0"
          max="100"
          value={opacity}
          onChange={(e) => handleOpacityChange(Number(e.target.value))}
          className="flex-1"
        />
        <span className="text-xs text-zinc-400 w-10 text-right">
          {opacity}%
        </span>
      </div>
    </div>
  );
}
