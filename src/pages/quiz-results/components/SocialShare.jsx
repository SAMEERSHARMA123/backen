import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialShare = ({ 
  score = 8, 
  totalQuestions = 10, 
  quizTitle = "General Knowledge Quiz",
  onShare 
}) => {
  const [isSharing, setIsSharing] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const percentage = Math.round((score / totalQuestions) * 100);
  const shareText = `I just scored ${score}/${totalQuestions} (${percentage}%) on "${quizTitle}" on QuizMaster Pro! 🎯`;
  const shareUrl = window.location?.href;

  const socialPlatforms = [
    {
      name: 'Twitter',
      icon: 'Twitter',
      color: 'hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`
    },
    {
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: 'hover:bg-blue-50 hover:border-blue-200 hover:text-blue-800',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(shareText)}`
    },
    {
      name: 'WhatsApp',
      icon: 'MessageCircle',
      color: 'hover:bg-green-50 hover:border-green-200 hover:text-green-600',
      url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`
    },
    {
      name: 'Telegram',
      icon: 'Send',
      color: 'hover:bg-blue-50 hover:border-blue-200 hover:text-blue-500',
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
    },
    {
      name: 'Reddit',
      icon: 'MessageSquare',
      color: 'hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600',
      url: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`
    }
  ];

  const handleSocialShare = async (platform) => {
    setIsSharing(true);
    
    try {
      if (platform?.name === 'Native' && navigator.share) {
        await navigator.share({
          title: 'QuizMaster Pro Results',
          text: shareText,
          url: shareUrl
        });
      } else {
        window.open(platform?.url, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
      }
      
      if (onShare) {
        onShare(platform?.name);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    } finally {
      setTimeout(() => setIsSharing(false), 1000);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard?.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const handleDownloadImage = () => {
    // Create a canvas element to generate the share image
    const canvas = document.createElement('canvas');
    const ctx = canvas?.getContext('2d');
    
    canvas.width = 800;
    canvas.height = 600;
    
    // Background gradient
    const gradient = ctx?.createLinearGradient(0, 0, canvas?.width, canvas?.height);
    gradient?.addColorStop(0, '#6366F1');
    gradient?.addColorStop(1, '#8B5CF6');
    ctx.fillStyle = gradient;
    ctx?.fillRect(0, 0, canvas?.width, canvas?.height);
    
    // Add text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 48px Inter';
    ctx.textAlign = 'center';
    ctx?.fillText('QuizMaster Pro', canvas?.width / 2, 100);
    
    ctx.font = '32px Inter';
    ctx?.fillText(quizTitle, canvas?.width / 2, 200);
    
    ctx.font = 'bold 72px Inter';
    ctx?.fillText(`${score}/${totalQuestions}`, canvas?.width / 2, 320);
    
    ctx.font = '36px Inter';
    ctx?.fillText(`${percentage}% Score`, canvas?.width / 2, 380);
    
    ctx.font = '24px Inter';
    ctx?.fillText('Take the quiz at quizmaster.pro', canvas?.width / 2, 500);
    
    // Download the image
    const link = document.createElement('a');
    link.download = `quiz-results-${Date.now()}.png`;
    link.href = canvas?.toDataURL();
    link?.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-strong rounded-2xl p-6 shadow-elevation-2"
    >
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
          <Icon name="Share2" size={20} color="white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Share Your Achievement</h3>
          <p className="text-sm text-muted-foreground">
            Let others know about your great performance!
          </p>
        </div>
      </div>
      {/* Achievement Preview */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-gradient-to-br from-primary to-secondary rounded-xl p-6 text-white text-center mb-6"
      >
        <div className="text-3xl font-bold mb-2">{percentage}%</div>
        <div className="text-lg mb-1">{score} out of {totalQuestions} correct</div>
        <div className="text-sm opacity-90">{quizTitle}</div>
        <div className="flex items-center justify-center space-x-2 mt-3">
          <Icon name="Award" size={16} />
          <span className="text-sm">QuizMaster Pro</span>
        </div>
      </motion.div>
      {/* Social Media Buttons */}
      <div className="space-y-4">
        <h4 className="font-medium text-sm text-muted-foreground">Share on social media:</h4>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {socialPlatforms?.map((platform, index) => (
            <motion.div
              key={platform?.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            >
              <Button
                variant="outline"
                fullWidth
                onClick={() => handleSocialShare(platform)}
                iconName={platform?.icon}
                iconPosition="left"
                iconSize={16}
                className={`${platform?.color} transition-all duration-200 hover:scale-105`}
                disabled={isSharing}
              >
                {platform?.name}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Native Share (if supported) */}
        {navigator.share && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Button
              variant="default"
              fullWidth
              onClick={() => handleSocialShare({ name: 'Native' })}
              iconName="Smartphone"
              iconPosition="left"
              loading={isSharing}
              className="hover:scale-105 transition-transform duration-200"
            >
              Share via Device
            </Button>
          </motion.div>
        )}
      </div>
      {/* Additional Actions */}
      <div className="mt-6 pt-6 border-t border-border/50 space-y-3">
        <h4 className="font-medium text-sm text-muted-foreground">More options:</h4>
        
        <div className="grid sm:grid-cols-2 gap-3">
          <Button
            variant="outline"
            fullWidth
            onClick={handleCopyLink}
            iconName={copiedLink ? "Check" : "Copy"}
            iconPosition="left"
            iconSize={16}
            className={`transition-all duration-200 ${
              copiedLink ? 'border-success text-success' : 'hover:scale-105'
            }`}
          >
            {copiedLink ? 'Link Copied!' : 'Copy Link'}
          </Button>

          <Button
            variant="outline"
            fullWidth
            onClick={handleDownloadImage}
            iconName="Download"
            iconPosition="left"
            iconSize={16}
            className="hover:scale-105 transition-transform duration-200"
          >
            Download Image
          </Button>
        </div>
      </div>
      {/* Share Statistics */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-6 p-4 bg-muted/30 rounded-lg"
      >
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="text-muted-foreground" />
            <span className="text-muted-foreground">Join 10,000+ quiz takers</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-success font-medium">Above Average!</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SocialShare;