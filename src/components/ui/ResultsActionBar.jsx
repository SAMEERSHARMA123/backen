import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from './Button';

const ResultsActionBar = ({ 
  score = 0,
  totalQuestions = 10,
  quizTitle = "Quiz Title",
  quizId,
  canRetake = true,
  canShare = true,
  canDownloadCertificate = false,
  onRetake,
  onShare,
  onDownloadCertificate
}) => {
  const [isSharing, setIsSharing] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [downloadingCertificate, setDownloadingCertificate] = useState(false);
  const navigate = useNavigate();

  const percentage = Math.round((score / totalQuestions) * 100);
  const isPassing = percentage >= 70;

  const handleRetake = () => {
    if (onRetake) {
      onRetake();
    } else {
      navigate('/quiz-gameplay', { state: { quizId, retake: true } });
    }
  };

  const handleBackToDashboard = () => {
    navigate('/quiz-dashboard');
  };

  const handleShare = async (platform) => {
    setIsSharing(true);
    
    const shareData = {
      title: `I scored ${score}/${totalQuestions} on ${quizTitle}!`,
      text: `Check out my quiz results on QuizMaster Pro - ${percentage}% score!`,
      url: window.location?.href
    };

    try {
      if (platform === 'native' && navigator.share) {
        await navigator.share(shareData);
      } else {
        // Platform-specific sharing
        const urls = {
          twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData?.text)}&url=${encodeURIComponent(shareData?.url)}`,
          facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData?.url)}`,
          linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData?.url)}`,
          whatsapp: `https://wa.me/?text=${encodeURIComponent(shareData?.text + ' ' + shareData?.url)}`
        };

        if (urls?.[platform]) {
          window.open(urls?.[platform], '_blank', 'width=600,height=400');
        }
      }

      if (onShare) {
        onShare(platform);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    } finally {
      setIsSharing(false);
      setShowShareModal(false);
    }
  };

  const handleDownloadCertificate = async () => {
    setDownloadingCertificate(true);
    
    try {
      if (onDownloadCertificate) {
        await onDownloadCertificate();
      } else {
        // Simulate certificate download
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Certificate downloaded');
      }
    } catch (error) {
      console.error('Error downloading certificate:', error);
    } finally {
      setDownloadingCertificate(false);
    }
  };

  const shareOptions = [
    { platform: 'twitter', label: 'Twitter', icon: 'Twitter', color: 'hover:bg-blue-50' },
    { platform: 'facebook', label: 'Facebook', icon: 'Facebook', color: 'hover:bg-blue-50' },
    { platform: 'linkedin', label: 'LinkedIn', icon: 'Linkedin', color: 'hover:bg-blue-50' },
    { platform: 'whatsapp', label: 'WhatsApp', icon: 'MessageCircle', color: 'hover:bg-green-50' },
  ];

  return (
    <>
      {/* Desktop Action Bar */}
      <div className="hidden md:flex items-center justify-center space-x-4 mt-8">
        {/* Primary Actions */}
        <div className="flex items-center space-x-3">
          {canRetake && (
            <Button
              variant="outline"
              size="lg"
              onClick={handleRetake}
              iconName="RotateCcw"
              iconPosition="left"
              className="hover-glow"
            >
              Retake Quiz
            </Button>
          )}

          {canShare && (
            <Button
              variant="default"
              size="lg"
              onClick={() => setShowShareModal(true)}
              iconName="Share2"
              iconPosition="left"
              className="hover-glow"
              loading={isSharing}
            >
              Share Results
            </Button>
          )}

          {canDownloadCertificate && isPassing && (
            <Button
              variant="success"
              size="lg"
              onClick={handleDownloadCertificate}
              iconName="Download"
              iconPosition="left"
              className="hover-glow"
              loading={downloadingCertificate}
            >
              Download Certificate
            </Button>
          )}
        </div>

        {/* Secondary Actions */}
        <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-border">
          <Button
            variant="ghost"
            size="lg"
            onClick={handleBackToDashboard}
            iconName="Home"
            iconPosition="left"
          >
            Back to Dashboard
          </Button>

          <Button
            variant="ghost"
            size="lg"
            onClick={() => navigate('/quiz-dashboard')}
            iconName="Search"
            iconPosition="left"
          >
            Browse More Quizzes
          </Button>
        </div>
      </div>
      {/* Mobile Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-100 glass border-t border-border/50 p-4">
        <div className="flex flex-col space-y-3">
          {/* Primary Actions Row */}
          <div className="flex space-x-3">
            {canRetake && (
              <Button
                variant="outline"
                fullWidth
                onClick={handleRetake}
                iconName="RotateCcw"
                iconPosition="left"
              >
                Retake
              </Button>
            )}

            {canShare && (
              <Button
                variant="default"
                fullWidth
                onClick={() => setShowShareModal(true)}
                iconName="Share2"
                iconPosition="left"
                loading={isSharing}
              >
                Share
              </Button>
            )}
          </div>

          {/* Certificate Download (if available) */}
          {canDownloadCertificate && isPassing && (
            <Button
              variant="success"
              fullWidth
              onClick={handleDownloadCertificate}
              iconName="Download"
              iconPosition="left"
              loading={downloadingCertificate}
            >
              Download Certificate
            </Button>
          )}

          {/* Navigation Actions */}
          <div className="flex space-x-3 pt-2 border-t border-border/50">
            <Button
              variant="ghost"
              fullWidth
              onClick={handleBackToDashboard}
              iconName="Home"
              iconPosition="left"
            >
              Dashboard
            </Button>

            <Button
              variant="ghost"
              fullWidth
              onClick={() => navigate('/quiz-dashboard')}
              iconName="Search"
              iconPosition="left"
            >
              More Quizzes
            </Button>
          </div>
        </div>
      </div>
      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-300 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowShareModal(false)} />
          <div className="relative glass-strong rounded-2xl p-6 w-full max-w-md animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Share Your Results</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowShareModal(false)}
                iconName="X"
              />
            </div>

            {/* Achievement Summary */}
            <div className="text-center mb-6 p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">
                {percentage}%
              </div>
              <div className="text-sm text-muted-foreground">
                {score} out of {totalQuestions} correct
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {quizTitle}
              </div>
            </div>

            {/* Share Options */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {shareOptions?.map((option) => (
                <Button
                  key={option?.platform}
                  variant="outline"
                  onClick={() => handleShare(option?.platform)}
                  iconName={option?.icon}
                  iconPosition="left"
                  className={`${option?.color} transition-colors duration-150`}
                  disabled={isSharing}
                >
                  {option?.label}
                </Button>
              ))}
            </div>

            {/* Native Share (if available) */}
            {navigator.share && (
              <Button
                variant="default"
                fullWidth
                onClick={() => handleShare('native')}
                iconName="Share"
                iconPosition="left"
                loading={isSharing}
              >
                Share via Device
              </Button>
            )}

            {/* Copy Link */}
            <Button
              variant="ghost"
              fullWidth
              onClick={() => {
                navigator.clipboard?.writeText(window.location?.href);
                setShowShareModal(false);
              }}
              iconName="Copy"
              iconPosition="left"
              className="mt-3"
            >
              Copy Link
            </Button>
          </div>
        </div>
      )}
      {/* Mobile Bottom Padding */}
      <div className="md:hidden h-32" />
    </>
  );
};

export default ResultsActionBar;