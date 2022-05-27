using EKrumynas.Data;
using EKrumynas.Models.Middleware;

namespace EKrumynas.Middleware
{
	public class DatabaseActivityWriter : IActivityLogger
	{
		private readonly EKrumynasDbContext _dbContext;

		public DatabaseActivityWriter(EKrumynasDbContext dbContext)
		{
			_dbContext = dbContext;
		}

		public void Log(ActivityRecord activityRecord)
        {
			_dbContext.ActivityRecords.Add(activityRecord);

			_dbContext.SaveChanges();
		}
	}
}
