import React, { useRef, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface DropdownItem {
  label: string;
  path: string;
  icon?: string;
  onClick?: () => void;
}

interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  isOpen: boolean;
  onToggle: () => void;
  onClose?: () => void;
  variant?: 'desktop' | 'mobile';
  loading?: boolean;
  loadingText?: string;
  className?: string;
  itemClassName?: string;
  twoColumns?: boolean; // New prop for two-column layout
}

const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  isOpen,
  onToggle,
  onClose,
  variant = 'desktop',
  loading = false,
  loadingText = 'Loading...',
  className = '',
  itemClassName = '',
  twoColumns = false,
}) => {
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);

  const handleItemClick = (item: DropdownItem) => {
    if (item.onClick) item.onClick();
    if (onClose) onClose();
  };

  const handleMouseEnter = () => {
    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    isHoveringRef.current = true;
    if (!isOpen) {
      onToggle();
    }
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    const relatedTarget = e.relatedTarget as HTMLElement;
    const currentTarget = e.currentTarget as HTMLElement;
    
    // Check if mouse is moving to a child element within the dropdown container
    if (relatedTarget && currentTarget.contains(relatedTarget)) {
      return;
    }
    
    // Check if mouse is moving to the dropdown menu itself (by checking if it has the data attribute)
    if (relatedTarget && (
      relatedTarget.closest('[data-dropdown="true"]') ||
      relatedTarget.closest('.dropdown-menu')
    )) {
      return;
    }
    
    // Set hovering to false and schedule close
    isHoveringRef.current = false;
    
    // Add delay before closing to allow mouse movement to dropdown
    closeTimeoutRef.current = setTimeout(() => {
      // Only close if still not hovering
      if (!isHoveringRef.current && onClose) {
        onClose();
      }
    }, 300); // Reasonable delay to allow mouse movement
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  /* ------------------------- FIXED DESKTOP VARIANT ------------------------- */
  if (variant === 'desktop') {
    return (
      <div
        ref={dropdownRef}
        className={`relative ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Trigger */}
        <div>
          {trigger}
        </div>

        {/* Dropdown - positioned to overlap trigger slightly, eliminating gap */}
        {isOpen && (
          <div 
            className={`dropdown-menu absolute top-full left-0 
              backdrop-blur-md 
              bg-white/80 dark:bg-black/40
              shadow-lg m-0 py-2 rounded-md 
              border border-/30 dark:border-gray-700/50
              z-[9999]
              ${twoColumns ? 'min-w-[450px]' : 'min-w-[200px]'}
            `}
            data-dropdown="true"
            style={{ 
              marginTop: '-2px', 
              paddingTop: '10px',
              pointerEvents: 'auto',
              animation: 'fadeInUp 0.3s ease-out'
            }}
            onMouseEnter={(e) => {
              e.stopPropagation();
              // Clear any pending close timeout when entering dropdown menu
              if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
                closeTimeoutRef.current = null;
              }
              isHoveringRef.current = true;
            }}
            onMouseLeave={(e) => {
              const relatedTarget = e.relatedTarget as HTMLElement;
              const currentTarget = e.currentTarget as HTMLElement;
              
              // If moving to a child element within the menu, don't close
              if (relatedTarget && currentTarget.contains(relatedTarget)) {
                return;
              }
              
              // If moving back to trigger or any part of the dropdown container, don't close
              if (dropdownRef.current && relatedTarget && dropdownRef.current.contains(relatedTarget)) {
                return;
              }
              
              // Mouse is leaving the dropdown area entirely
              isHoveringRef.current = false;
              closeTimeoutRef.current = setTimeout(() => {
                if (!isHoveringRef.current && onClose) {
                  onClose();
                }
              }, 300);
            }}
          >
            {/* Invisible bridge area at top to help with mouse movement */}
            <div 
              style={{ 
                position: 'absolute',
                top: '-5px',
                left: 0,
                right: 0,
                height: '5px',
                pointerEvents: 'auto'
              }}
              onMouseEnter={(e) => {
                e.stopPropagation();
                if (closeTimeoutRef.current) {
                  clearTimeout(closeTimeoutRef.current);
                  closeTimeoutRef.current = null;
                }
                isHoveringRef.current = true;
              }}
            />
            {loading || items.length === 0 ? (
              <div className="p-0">
                {loading ? (
                  <div className="py-2">
                    {twoColumns ? (
                      <div className="grid grid-cols-2 gap-0">
                        {Array.from({ length: 10 }).map((_, index) => (
                          <div key={index} className="py-3 px-6">
                            <div className="h-4 bg-gray-200 rounded animate-pulse" style={{ width: `${70 + (index % 3) * 10}%` }}></div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <ul className="list-none m-0 p-0">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <li key={index} className="p-0">
                            <div className="py-3 px-6">
                              <div className="h-4 bg-gray-200 rounded animate-pulse" style={{ width: `${70 + (index % 2) * 20}%` }}></div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <span className="block py-3 px-6 text-gray-500 dark:text-gray-400 italic text-sm">
                    {loadingText}
                  </span>
                )}
              </div>
            ) : twoColumns ? (
              <div className="grid grid-cols-2 gap-0">
                {items.map((item, index) => (
                  <a
                    key={item.label}
                    href={item.path}
                    onClick={() => handleItemClick(item)}
                    className={`block py-3 px-6 no-underline 
                      text-black dark:text-white
                      transition-all duration-200 ease-out
                      hover:bg-white/40 dark:hover:bg-black/40
                      hover:translate-x-1
                      hover:shadow-md
                      hover:backdrop-blur-sm
                      text-sm cursor-pointer
                      ${itemClassName}`}
                    style={{
                      animationDelay: `${index * 30}ms`,
                      animation: isOpen ? 'fadeInUp 0.3s ease-out forwards' : 'none'
                    }}
                  >
                    {item.icon && <span className="mr-2 inline-block transition-transform duration-200 hover:scale-110">{item.icon}</span>}
                    {item.label}
                  </a>
                ))}
              </div>
            ) : (
              <ul className="list-none m-0 p-0">
                {items.map((item, index) => (
                  <li key={item.label} className="p-0">
                    <a
                      href={item.path}
                      onClick={() => handleItemClick(item)}
                      className={`block py-3 px-6 no-underline 
                        text-black dark:text-white
                        transition-all duration-200 ease-out
                        hover:bg-white/40 dark:hover:bg-black/40
                        hover:translate-x-1
                        hover:shadow-md
                        hover:backdrop-blur-sm
                        text-sm cursor-pointer
                        ${itemClassName}`}
                      style={{
                        animationDelay: `${index * 30}ms`,
                        animation: isOpen ? 'fadeInUp 0.3s ease-out forwards' : 'none'
                      }}
                    >
                      {item.icon && <span className="mr-2 inline-block transition-transform duration-200 hover:scale-110">{item.icon}</span>}
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    );
  }

  /* ------------------------- MOBILE VARIANT ------------------------- */
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between w-full">
        <div className="flex-1" onClick={onToggle}>
          {trigger}
        </div>
        <button
          onClick={onToggle}
          className="p-2 text-gray-600 hover:text-black transition-colors"
          aria-label="Toggle dropdown"
        >
          <span
            className={`text-xs transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          >
            ▼
          </span>
        </button>
      </div>

      {isOpen && (
        <ul className="bg-gray-50 list-none m-0 py-2 w-full mt-2">
          {loading || items.length === 0 ? (
            <li className="p-0 w-full">
              {loading ? (
                <div className="py-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="py-3 px-6">
                      <div className="h-4 bg-gray-200 rounded animate-pulse" style={{ width: `${70 + (index % 2) * 20}%` }}></div>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="block py-3 px-6 text-gray-500 italic text-sm sm:text-base">
                  {loadingText}
                </span>
              )}
            </li>
          ) : (
            items.map((item) => (
              <li key={item.label} className="p-0 w-full">
                <a
                  href={item.path}
                  onClick={() => handleItemClick(item)}
                  className={`block py-3 px-6 no-underline text-black transition-colors duration-300 hover:bg-gray-200 hover:text-black text-sm sm:text-base ${itemClassName}`}
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                </a>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
