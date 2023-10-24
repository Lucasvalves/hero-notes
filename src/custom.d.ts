declare module "*.svg" {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSGElement>>;
  const src: string;
  export default src;
}

