import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CertificateDownload = ({ 
  score = 8, 
  totalQuestions = 10, 
  quizTitle = "General Knowledge Quiz",
  userName = "John Doe",
  completionDate = new Date(),
  onDownload 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const percentage = Math.round((score / totalQuestions) * 100);
  const isPassing = percentage >= 70;
  const isExcellent = percentage >= 90;

  const handleDownloadCertificate = async () => {
    setIsGenerating(true);
    
    try {
      // Create certificate canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas?.getContext('2d');
      
      // Set canvas size (A4 landscape proportions)
      canvas.width = 1200;
      canvas.height = 850;
      
      // Background
      const gradient = ctx?.createLinearGradient(0, 0, canvas?.width, canvas?.height);
      gradient?.addColorStop(0, '#F8FAFC');
      gradient?.addColorStop(1, '#E2E8F0');
      ctx.fillStyle = gradient;
      ctx?.fillRect(0, 0, canvas?.width, canvas?.height);
      
      // Border
      ctx.strokeStyle = '#6366F1';
      ctx.lineWidth = 8;
      ctx?.strokeRect(40, 40, canvas?.width - 80, canvas?.height - 80);
      
      // Inner border
      ctx.strokeStyle = '#8B5CF6';
      ctx.lineWidth = 2;
      ctx?.strokeRect(60, 60, canvas?.width - 120, canvas?.height - 120);
      
      // Header
      ctx.fillStyle = '#1E293B';
      ctx.font = 'bold 48px Inter';
      ctx.textAlign = 'center';
      ctx?.fillText('CERTIFICATE OF COMPLETION', canvas?.width / 2, 150);
      
      // Subtitle
      ctx.font = '24px Inter';
      ctx.fillStyle = '#64748B';
      ctx?.fillText('This certifies that', canvas?.width / 2, 220);
      
      // User name
      ctx.font = 'bold 56px Inter';
      ctx.fillStyle = '#6366F1';
      ctx?.fillText(userName, canvas?.width / 2, 300);
      
      // Achievement text
      ctx.font = '28px Inter';
      ctx.fillStyle = '#1E293B';
      ctx?.fillText('has successfully completed', canvas?.width / 2, 360);
      
      // Quiz title
      ctx.font = 'bold 36px Inter';
      ctx.fillStyle = '#8B5CF6';
      ctx?.fillText(quizTitle, canvas?.width / 2, 420);
      
      // Score
      ctx.font = 'bold 32px Inter';
      ctx.fillStyle = '#10B981';
      ctx?.fillText(`with a score of ${score}/${totalQuestions} (${percentage}%)`, canvas?.width / 2, 480);
      
      // Date
      ctx.font = '20px Inter';
      ctx.fillStyle = '#64748B';
      ctx?.fillText(`Completed on ${completionDate?.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}`, canvas?.width / 2, 550);
      
      // Footer
      ctx.font = '18px Inter';
      ctx?.fillText('QuizMaster Pro - Excellence in Learning', canvas?.width / 2, 720);
      
      // Award icon (simplified)
      ctx.fillStyle = '#F59E0B';
      ctx?.beginPath();
      ctx?.arc(canvas?.width / 2, 620, 40, 0, 2 * Math.PI);
      ctx?.fill();
      
      ctx.fillStyle = 'white';
      ctx.font = 'bold 32px Inter';
      ctx?.fillText('★', canvas?.width / 2, 635);
      
      // Download the certificate
      const link = document.createElement('a');
      link.download = `${quizTitle?.replace(/\s+/g, '_')}_Certificate_${userName?.replace(/\s+/g, '_')}.png`;
      link.href = canvas?.toDataURL('image/png', 1.0);
      link?.click();
      
      if (onDownload) {
        onDownload();
      }
      
    } catch (error) {
      console.error('Error generating certificate:', error);
    } finally {
      setTimeout(() => setIsGenerating(false), 2000);
    }
  };

  const getCertificateType = () => {
    if (isExcellent) return { type: 'Excellence', color: 'text-success', icon: 'Award' };
    if (isPassing) return { type: 'Completion', color: 'text-primary', icon: 'Medal' };
    return null;
  };

  const certificateType = getCertificateType();

  if (!isPassing) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-strong rounded-2xl p-6 shadow-elevation-2 text-center"
      >
        <div className="w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="AlertCircle" size={32} className="text-warning" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Certificate Not Available</h3>
        <p className="text-muted-foreground mb-4">
          You need a score of 70% or higher to earn a certificate.
        </p>
        <p className="text-sm text-muted-foreground">
          Your current score: <span className="font-medium">{percentage}%</span>
        </p>
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Target" size={16} />
            <span>Retake the quiz to earn your certificate!</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-strong rounded-2xl p-6 shadow-elevation-2"
    >
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-success to-primary rounded-full flex items-center justify-center">
          <Icon name="Award" size={20} color="white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Certificate Available!</h3>
          <p className="text-sm text-muted-foreground">
            Congratulations on your achievement
          </p>
        </div>
      </div>
      {/* Certificate Preview */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-primary/20 rounded-xl p-6 mb-6 overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full -translate-y-10 translate-x-10" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-full translate-y-8 -translate-x-8" />
        
        <div className="relative text-center">
          <div className="text-xs font-medium text-muted-foreground mb-2">
            CERTIFICATE OF {certificateType?.type?.toUpperCase()}
          </div>
          
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name={certificateType?.icon} size={24} color="white" />
          </div>
          
          <h4 className="font-bold text-lg text-foreground mb-2">{userName}</h4>
          <p className="text-sm text-muted-foreground mb-2">has successfully completed</p>
          <p className="font-semibold text-primary mb-2">{quizTitle}</p>
          <p className={`text-sm font-medium ${certificateType?.color}`}>
            Score: {score}/{totalQuestions} ({percentage}%)
          </p>
          
          <div className="flex items-center justify-center space-x-4 mt-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={12} />
              <span>{completionDate?.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Brain" size={12} />
              <span>QuizMaster Pro</span>
            </div>
          </div>
        </div>
      </motion.div>
      {/* Certificate Details */}
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="User" size={14} className="text-primary" />
              <span className="font-medium">Recipient</span>
            </div>
            <p className="text-muted-foreground">{userName}</p>
          </div>
          
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="Trophy" size={14} className="text-success" />
              <span className="font-medium">Achievement</span>
            </div>
            <p className="text-muted-foreground">{certificateType?.type}</p>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-success/10 to-primary/10 border border-success/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="CheckCircle" size={16} className="text-success" />
            </div>
            <div>
              <h5 className="font-medium text-success mb-1">Certificate Features</h5>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• High-resolution PNG format</li>
                <li>• Professional design with your name</li>
                <li>• Verification details included</li>
                <li>• Perfect for LinkedIn and portfolios</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          variant="default"
          fullWidth
          onClick={handleDownloadCertificate}
          iconName="Download"
          iconPosition="left"
          loading={isGenerating}
          className="h-12 text-base font-medium hover-glow"
        >
          {isGenerating ? 'Generating Certificate...' : 'Download Certificate'}
        </Button>

        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            fullWidth
            onClick={() => setShowPreview(!showPreview)}
            iconName="Eye"
            iconPosition="left"
            iconSize={16}
          >
            {showPreview ? 'Hide Preview' : 'Preview'}
          </Button>

          <Button
            variant="outline"
            fullWidth
            onClick={() => {
              const shareData = {
                title: 'My Quiz Certificate',
                text: `I earned a certificate for completing ${quizTitle} with ${percentage}% score!`,
                url: window.location?.href
              };
              
              if (navigator.share) {
                navigator.share(shareData);
              } else {
                navigator.clipboard?.writeText(`${shareData?.text} ${shareData?.url}`);
              }
            }}
            iconName="Share"
            iconPosition="left"
            iconSize={16}
          >
            Share
          </Button>
        </div>
      </div>
      {/* Success Message */}
      {isGenerating && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg"
        >
          <div className="flex items-center space-x-2 text-success text-sm">
            <Icon name="Loader2" size={16} className="animate-spin" />
            <span>Generating your personalized certificate...</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CertificateDownload;