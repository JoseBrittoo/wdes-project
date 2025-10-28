import React, { useState } from "react";

export const Tabs = ({ defaultValue, children, className }: any) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div className={className}>
      {React.Children.map(children, (child) => {
        if (child.type === TabsList) {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        if (child.type === TabsContent && child.props.value === activeTab) {
          return child;
        }
        return null;
      })}
    </div>
  );
};

export const TabsList = ({
  children,
  activeTab,
  setActiveTab,
  className,
}: any) => {
  return (
    <div className={className}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
};

export const TabsTrigger = ({
  value,
  children,
  activeTab,
  setActiveTab,
}: any) => {
  const isActive = activeTab === value;

  return (
    <button
      className={`px-4 py-2 text-lg font-semibold ${
        isActive
          ? "font-bold border-b-2 border-blue-600"
          : "text-gray-700 hover:text-blue-600"
      }`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ value, children }: any) => {
  return <div>{children}</div>;
};
