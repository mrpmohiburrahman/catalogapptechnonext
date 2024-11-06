
// RCTTimestampModule.m
#import "RCTTimestampModule.h"
#import <React/RCTLog.h>

@interface RCTTimestampModule ()
@property(nonatomic, strong) dispatch_source_t timer;
@end

@implementation RCTTimestampModule

RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents {
  return @[ @"TimestampEvent" ];
}

- (void)startObserving {
  if (!self.timer) {
    dispatch_queue_t queue = dispatch_get_main_queue();
    self.timer =
        dispatch_source_create(DISPATCH_SOURCE_TYPE_TIMER, 0, 0, queue);
    if (self.timer) {
      dispatch_source_set_timer(self.timer, dispatch_time(DISPATCH_TIME_NOW, 0),
                                20 * NSEC_PER_SEC, 1 * NSEC_PER_SEC);
      __weak typeof(self) weakSelf = self;
      dispatch_source_set_event_handler(self.timer, ^{
        [weakSelf sendTimestamp];
      });
      dispatch_resume(self.timer);
      RCTLogInfo(@"GCD Timer started with 20-second interval.");
    }
  }
}

- (void)stopObserving {
  if (self.timer) {
    dispatch_source_cancel(self.timer);
    self.timer = nil;
    RCTLogInfo(@"GCD Timer invalidated.");
  }
}

- (void)sendTimestamp {
  NSDate *now = [NSDate date];
  NSTimeInterval timestamp = [now timeIntervalSince1970] * 1000; // Milliseconds
  [self sendEventWithName:@"TimestampEvent"
                     body:@{@"timestamp" : @(timestamp)}];
  RCTLogInfo(@"Timestamp sent: %@", now);
}

+ (BOOL)requiresMainQueueSetup {
  return YES;
}

@end
