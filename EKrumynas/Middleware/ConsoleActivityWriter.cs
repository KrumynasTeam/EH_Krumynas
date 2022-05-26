using System;
using EKrumynas.Models.Middleware;

namespace EKrumynas.Middleware
{
	public class ConsoleActivityWriter : IActivityLogger
	{
        private readonly DatabaseActivityWriter _databaseActivityWriter;

        public ConsoleActivityWriter(DatabaseActivityWriter databaseActivityWriter)
		{
            _databaseActivityWriter = databaseActivityWriter;

        }

        public void Log(ActivityRecord activityRecord)
        {
           Console.WriteLine("[{0}] Id: {1} | Username: [{2}] | Role: [{3}] | Method: [{4}].", activityRecord.Date, activityRecord.Id, activityRecord.Username, activityRecord.Role, activityRecord.Method);
            _databaseActivityWriter.Log(activityRecord);
        }
    }
}
