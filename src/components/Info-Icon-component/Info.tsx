import React from 'react';
import { Tooltip, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

interface InfoIconProps {
  /**
   * The text to display in the tooltip
   */
  tooltipText: string;
  /**
   * Optional placement of the tooltip
   * @default 'top'
   */
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end';
  /**
   * Optional size for the icon
   * @default 'small'
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Optional color for the icon
   * @default 'default'
   */
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  /**
   * Optional custom class name for the icon button
   */
  className?: string;
  tooltipFontSize?: string;
  textAlign?: 'left' | 'center' | 'right';

}

const Info: React.FC<InfoIconProps> = ({
  tooltipText,
  placement = 'top',
  size = 'small',
  color = 'default',
  className,
  tooltipFontSize = '13px',
  textAlign = 'center',
}) => {
  return (
    <Tooltip
      title={tooltipText}
      placement={placement}
      arrow
      enterTouchDelay={0} // Makes tooltip appear immediately on mobile
       componentsProps={{
        tooltip: {
          sx: {
            fontSize: tooltipFontSize,
            textAlign: textAlign,
            bgcolor: '#430E00',
            '& .MuiTooltip-arrow': {
              color: '#ffffff',
            },
          },
        },
      }}
    >
      <IconButton 
        size={size} 
        color={color}
        className={className}
        sx={{ 
          padding: '4px', // Smaller padding for a more compact look
          '&:hover': {
            backgroundColor: 'transparent', // Remove background on hover for cleaner look
          }
        }}
      >
        <InfoOutlinedIcon 
          fontSize={size} 
          sx={{ 
            fontSize: size === 'small' ? '18px' : size === 'medium' ? '20px' : '30px',
            color: 'text.secondary',
            '&:hover': {
              color: '#430E00',
            }
          }} 
        />
      </IconButton>
    </Tooltip>
  );
};

export default Info;