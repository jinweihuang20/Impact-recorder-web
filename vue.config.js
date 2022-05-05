module.exports = {
    outputDir: process.env.NODE_ENV === 'production'
      ? '../spindle_recorder_2020/gpm_Spindle_Recorder_main_core3/wwwroot'
      : '/dist2'
  }